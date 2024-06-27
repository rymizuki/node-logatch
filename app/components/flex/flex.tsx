import { sva } from '@styled-system/css/index.mjs'
import { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  direction?: CSSProperties['flexDirection']
  gap?: CSSProperties['gap']
}

export const Flex = ({ children, direction = 'row', gap }: Props) => {
  const c = style()
  return (
    <div className={c.root} style={{ flexDirection: direction, gap }}>
      {children}
    </div>
  )
}

const style = sva({
  slots: ['root'],
  base: {
    root: {
      display: 'flex',
    },
  },
})
