import { cdate } from 'cdate'
import EventEmitter from 'events'
import crypto from 'crypto'
import ansicolor, { AnsiColored } from 'ansicolor'
import { logger } from './logger'

export type LogRecord = {
  id: string
  type: 'json' | 'text'
  content: string
  ansi: AnsiColored
  json?: Record<string, unknown>
  timestamp: string
}

class Store extends EventEmitter {
  private rows: LogRecord[] = []

  push(content: string) {
    const json = parseJSON(content)
    const row: LogRecord = {
      id: crypto.randomUUID(),
      content,
      type: json ? 'json' : 'text',
      json,
      ansi: ansicolor.parse(content),
      timestamp: cdate().format(),
    }
    this.rows.push(row)
    this.emit('record', row)
  }
}

function parseJSON(value: string) {
  const match = value.match(new RegExp(/\{(.+)\}$/))
  if (match) {
    const content = match[0]
    try {
      return JSON.parse(content)
    } catch (error) {
      if (error instanceof Error) {
        logger('server').warning(error.message, {
          error: {
            message: error.message,
            stack: error.stack,
          },
          content,
          source: value,
        })
      } else {
        logger('server').warning(error as string)
      }
      return
    }
  }
  return
}

const store = new Store()

export { Store, store }
