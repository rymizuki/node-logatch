/* eslint @typescript-eslint/no-var-requires: 0 */
const path = require('path')

// eslint-disable-next-line  @typescript-eslint/no-floating-promises
require('esbuild').build({
  entryPoints: ['./app/server.ts', './app/recorder.ts'],
  bundle: true,
  format: 'cjs',
  platform: 'node',
  outdir: 'build/',
  sourcemap: true,
  external: [
    'express',
    'morgan',
    'path',
    '@remix-run/express',
    '@remix-run/node',
    path.resolve(__dirname, './build'),
  ],
  plugins: [
    require('esbuild-plugin-alias')({
      '~/*': path.resolve(__dirname, 'app'),
      '@styled-system/*': path.resolve(__dirname, 'styled-system'),
    }),
  ],
})
