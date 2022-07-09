const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  devServer: {
    open: false,
    proxy: {
      [process.env.BASE_URL]: {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.BASE_URL]: ''
        }
      }
    }
  }
}
