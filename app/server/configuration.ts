import fs from 'fs'
import path from 'path'
import { z } from 'zod'

const defaultConfig = {
  port: 18085,
  host: '0.0.0.0',
}

const load = () => {
  const homeDir =
    process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'] ?? '/'
  const configFile = path.resolve(homeDir, '.logatch.config.json')

  if (!fs.existsSync(configFile)) {
    fs.writeFileSync(configFile, JSON.stringify(defaultConfig), 'utf-8')
    console.info(`[logatch] Generate configuration file at "${configFile}"`)
  }

  const data = fs.readFileSync(configFile, 'utf-8')
  const ret = z
    .object({
      port: z.number(),
      host: z.string(),
    })
    .safeParse(JSON.parse(data))
  if (!ret.success) {
    throw new Error(`logatch can not load configuration. invalid format`)
  }

  return ret.data
}

export { load }
