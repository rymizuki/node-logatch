import { LoggerInterface, createLogone } from '@logone/core'
import { createAdapter } from '@logone/adapter-node'

export const logger = (type: 'server' | 'cli') => {
  const logone = createLogone(createAdapter())
  const { logger, finish } = logone.start(type)
  const wrapper: LoggerInterface = {
    debug(format, ...args) {
      logger.debug(format, ...args)
      finish()
    },
    info(format, ...args) {
      logger.info(format, ...args)
      finish()
    },
    warning(format, ...args) {
      logger.warning(format, ...args)
      finish()
    },
    error(format, ...args) {
      logger.error(format, ...args)
      finish()
    },
    critical(format, ...args) {
      logger.critical(format, ...args)
      finish()
    },
    record(severity, format) {
      logger.record(severity, format)
      finish()
    },
  }
  return wrapper
}
