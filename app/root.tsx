import type { LinksFunction } from '@remix-run/node'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import global from './styles/global.css'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: global }]
}

export default function App() {
  return (
    <html lang={'ja'}>
      <head>
        <meta charSet="UTF-8" />
        <title>example</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
