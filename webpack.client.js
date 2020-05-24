const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')
const LoadablePlugins = require('@loadable/webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const { createEmotionPlugin } = require('emotion-ts-plugin')

const devMode = process.env.NODE_ENV !== 'production'
const emotionTransformer = createEmotionPlugin()
const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`

const getEntryPoint = target => {
  if (target === 'node') {
    return ['./src/App.tsx']
  }

  return devMode ? [hotMiddlewareScript, './src/index.tsx'] : ['./src/index.tsx']
}

const getConfig = target => ({
  mode: devMode ? 'development' : 'production',
  
  name: target,

  target,

  entry: getEntryPoint(target),

  output: {
    path: path.resolve(__dirname, `dist/${target}`),
    filename: '[name].js',
    publicPath: '/web/',
    libraryTarget: target === 'node' ? 'commonjs2' : undefined
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({ before: [emotionTransformer]})
            }
          }
        ]
      },
      {
        test: /\.(scss|css)$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      pages: path.resolve('src/pages/'),
      components: path.resolve('src/components/'),
      actions: path.resolve('src/store/actions/'),
      reducers: path.resolve('src/store/reducers/'),
      utils: path.resolve('src/utils/')
    }
  },

  plugins:
    target === 'web'
      ? [new LoadablePlugins(), new MiniCssExtractPlugin(), new webpack.HotModuleReplacementPlugin()]
      : [new LoadablePlugins(), new MiniCssExtractPlugin()],
  
  externals: target === 'node' ? ['@loadable/component', nodeExternals()]: undefined
})  

module.exports = [getConfig('web'), getConfig('node')]