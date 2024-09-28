import readline from 'readline'
import { parseArgs } from 'util'
import { load } from '~/server/configuration'

const options = {
  silent: {
    type: 'boolean' as const,
    short: 's',
  },
}
const input = process.argv.slice(2)
const { values: args } = parseArgs({ options, args: input })

process.stdin.setEncoding('utf-8')

const start = () => {
  const config = load()
  const reader = readline.createInterface({
    input: process.stdin,
  })

  reader.on('line', (line) => {
    if (!args.silent) {
      console.log(line)
    }

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
}

start()
