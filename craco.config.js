const path = require('path')
const { readFile } = require('fs/promises')
const CracoLessPlugin = require('craco-less')
const styleResourcesLoader = require('style-resources-loader')

module.exports = async function ({ env }) {
  const baseUrl = await getEnvConfig(env, 'REACT_APP_BASE_URL')
  const proxyUrl = await getEnvConfig(env, 'REACT_APP_PROXY_URL')
  return {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }
      }
    ],
    webpack: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    style: {
      postcssOption: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer')
        ]
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
