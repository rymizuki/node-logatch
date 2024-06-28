import { createRequestHandler } from '@remix-run/express'
import { broadcastDevReady } from '@remix-run/node'
import express from 'express'
import http from 'http'
import { resolve } from 'path'
import { Server } from 'socket.io'

import './recorder'
import { store } from './server/store'
import { load } from './server/configuration'
import logone from '@logone/express'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const build = require(resolve(__dirname, './'))
const app = express()

app.use(express.static(resolve(__dirname, '../public')))
app.use(express.json())
app.use(logone())

app.post('/records', (req, res) => {
  store.push(req.body.content)
  res.sendStatus(201)
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.all('*', createRequestHandler({ build, getLoadContext }))

function getLoadContext() {
  return {}
}

const server = http.createServer(app)

const config = load()
const PORT = config.port
const HOST = config.host
server.listen(PORT, HOST, () => {
  console.info(`start server on http://${HOST}:${PORT}`)
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    broadcastDevReady(build)
  }
})

const io = new Server(server, { path: '/socket' })
io.on('connection', () => {
  io.emit('connected')
})

store.on('record', (record) => {
  io.emit('record', record)
})
