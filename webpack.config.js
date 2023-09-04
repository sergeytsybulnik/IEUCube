const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = (env) => {
  console.log(env);

  const isDev = env.mode === 'development';
  
  return {
    mode: env.mode || 'development',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? {
      static: './build',
      hot: true,
      port: env.port || 8080,
    } : undefined,
    performance: {
      hints: false
    },
    output: {
      filename: '[name].cube.js',
      path: path.resolve(__dirname, 'build'),
      clean: true,
      assetModuleFilename: 'assets/[hash][ext][query]'
    },
    optimization: {
      runtimeChunk: 'single',
    },
    module: {
      rules: [
          {
            test: /\.svg/,
            type: 'asset/resource',
            generator: {
              filename: 'assets/[hash][ext][query]',
            },
          },
        ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
      new webpack.ProgressPlugin(),
    ],
  }
}
