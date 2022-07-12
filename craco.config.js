const path = require('path')
const { readFile } = require('fs/promises')

module.exports = async function ({ env }) {
  const baseUrl = await getEnvConfig(env, 'REACT_APP_BASE_URL')
  const proxyUrl = await getEnvConfig(env, 'REACT_APP_PROXY_URL')
  return {
    webpack: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    devServer: {
      open: false,
      proxy: {
        [baseUrl]: {
          target: proxyUrl,
          changeOrigin: true,
          pathRewrite: {
            ['^' + baseUrl]: ''
          }
        }
      }
    }
  }
}

async function getEnvConfig (env, name) {
  const file = await readFile(`./.env.${env}`, 'utf8')
  const arr = file.split('\n').find(i => i.includes(name))
  return arr.split('=')[1].trim()
}
