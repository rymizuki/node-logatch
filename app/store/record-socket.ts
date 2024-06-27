import { useEffect, useState, useSyncExternalStore } from 'react'
import { Socket, io } from 'socket.io-client'
import { LogRecord } from '~/server/store'

let listeners: (() => void)[] = []
let __records: LogRecord[] = []

export function useRecordSocketStore() {
  const [, setSocket] = useState<null | Socket>(null)

  function onConnected() {
    console.log('socket connected')
  }

  function onReceive(receive: LogRecord) {
    __records = [receive, ...__records]
    __emit()
  }

  function __emit() {
    listeners.forEach((listener) => listener())
  }

  useEffect(() => {
    setSocket((prev) => {
      if (prev) return prev
      const socket = io({ path: '/socket' })

      socket.on('connected', onConnected)
      socket.on('record', onReceive)
      return socket
    })
  }, [])

  const records = useSyncExternalStore<typeof __records>(
    function subscribe(listener) {
      listeners = [...listeners, listener]

      return () => {
        listeners = listeners.filter((fn) => fn === listener)
      }
    },
    function getSnapshot() {
      return __records
    },
    function getServerSnapshot() {
      return __records
    },
  )
  return { records }
}
