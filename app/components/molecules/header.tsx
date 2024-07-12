import { sva } from '@styled-system/css/index.mjs'

type Props = {
  title: string
}

export const Header = ({ title }: Props) => {
  const c = style({})
  return (
    <header className={c.root}>
      <h1 className={c.title}>{title}</h1>
    </header>
  )
}

const style = sva({
  slots: ['root', 'title'],
  base: {
    root: {
      width: '100%',
      margin: '0',
      padding: '0.2rem 1rem',
      background: '#FFFAFA',
      // https://qiita.com/xrxoxcxox/items/a09b7932cac12e2c3d44
      boxShadow: '0 10px 4px -5px rgb(0 0 0 / 20%)',
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      letterSpacing: '0.25rem',
    },
  },
})
