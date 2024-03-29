/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  serverBuildTarget: 'vercel',
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === 'development' ? undefined : './server.js',
  ignoredRouteFiles: ['**/.*'],
  serverDependenciesToBundle: ['@center-inc/react', 'd3-array', 'd3-time-format'],
  routes: async (define) => {
    return define((route) => {
      route('/action/set-theme', 'actions/set-theme.tsx');
      route('/collection/:address', 'pages/collection.tsx');
      route('/nft/:address/:id', 'pages/display.tsx');
      route('/spinners', 'pages/spinners.tsx');
      route('/token/:address', 'pages/token.tsx');
      route('/pair/:address', 'pages/pair.tsx');
      route('/account/:address', 'pages/account.tsx');
    });
  },
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
};
