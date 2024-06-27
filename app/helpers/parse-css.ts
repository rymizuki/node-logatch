export function parseCSS(style: string) {
  return style.split(';').reduce(
    (prev, line) => {
      const [prop, value] = line.trim().split(':')
      if (!prop || !value) {
        return prev
      }
      prev[prop.trim()] = value.trim()
      return prev
    },
    {} as Record<string, string>,
  )
}
