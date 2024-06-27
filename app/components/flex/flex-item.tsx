import { CSSProperties, ReactNode } from 'react'

type Props = {
  children: ReactNode
  shrink?: boolean
  grow?: boolean
  width?: CSSProperties['width']
}

export const FlexItem = ({ children, shrink, grow, width }: Props) => {
  return (
    <div
      style={{
        flexGrow: grow ? 1 : 0,
        flexShrink: shrink ? 1 : 0,
        width,
      }}
    >
      {children}
    </div>
  )
}
