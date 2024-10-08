/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  ignoredRouteFiles: ['**/.*', '**/components/**/*', '**/presenter/**/*'],
  // 差分を検出したときhot reloadする
  watchPaths: ['./styled-system/**/*'],
  // 利用するパッケージは、SSRのバンドルに含めるためにトランスパイルする
  serverModuleFormat: 'cjs',
  serverDependenciesToBundle: ['./styled-system/**/*'],
  feature: {
    v2_dev: {
      port: 18086,
    },
  },
  dev: {
    port: 18086,
  },
  postcss: true,
  browserNodeBuiltinsPolyfill: {},
}
