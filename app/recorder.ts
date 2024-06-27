import readline from 'readline'
import { load } from '~/server/configuration'

process.stdin.setEncoding('utf-8')

const start = () => {
  const config = load()
  const reader = readline.createInterface({
    input: process.stdin,
  })
  reader.on('line', (line) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetch(`http://${config.host}:${config.port}/records`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: line }),
    })
  })

  reader.on('close', () => {
    console.info('close')
  })
}

start()
