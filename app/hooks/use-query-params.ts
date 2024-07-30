import { useSearchParams } from '@remix-run/react'
import qs from 'qs'
import { useMemo } from 'react'

export function useQueryParams<T = Record<string, unknown>>() {
  const [urlSearchParams, updateUrlSearchParams] = useSearchParams()
  const params = useMemo(() => {
    return qs.parse(urlSearchParams.toString()) as T
  }, [urlSearchParams])

  const update = (input: Record<string, unknown>) => {
    const queryString = qs.stringify(input)
    const queries = queryString.split(/&/)
    updateUrlSearchParams((prev) => {
      for (let index = 0; index < queries.length; index++) {
        const query = queries[index]
        const [key, value] = query.split('=')
        prev.set(decodeURIComponent(key), value)
      }
      return prev
    })
  }

  return {
    params,
    update,
  }
}
