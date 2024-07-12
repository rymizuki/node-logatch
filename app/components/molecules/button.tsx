import { sva } from '@styled-system/css/sva.mjs'
import { ComponentProps } from 'react'

type Props = ComponentProps<'button'>

export const Button = ({ ...props }: Props) => {
  const c = style()
  return <button {...props} className={c.root}></button>
}

const style = sva({
  slots: ['root'],
  base: {
    root: {
      minHeight: '1.8rem',
      padding: '0.2rem 0.8rem',
      border: '1px solid #C0C0C0',
      borderRadius: '0.4rem',
      background: '#FFFAFA',
      _hover: {
        background: '#F5F5F5',
      },
    },
  },
})
