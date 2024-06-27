import { cdate } from 'cdate'
import EventEmitter from 'events'
import crypto from 'crypto'
import ansicolor, { AnsiColored } from 'ansicolor'

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
    try {
      const content = match[0]
      return JSON.parse(content)
    } catch (error) {
      console.warn(error)
      return
    }
  }
  return
}

const store = new Store()

export { Store, store }
