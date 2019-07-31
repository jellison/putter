const HtmlWebpackPlugin = require('html-webpack-plugin');

const outputPath = __dirname + '/dist';
const rules = [
  {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'ts-loader'
      }
    ]
  },
  { // Processes all css-modules sass files (*.m.scss)
    test: /\.m.scss$/,
    exclude: /node_modules/,
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader', options: { modules: true } },
      { loader: 'sass-loader' }
    ]
  },
  { // Processes all non-module (i.e., global) sass files
    test: /.scss$/,
    exclude: [/node_modules/, /\.m\.scss$/],
    use: [
      { loader: 'style-loader' },
      { loader: 'css-loader' },
      { loader: 'sass-loader' }
    ]
  },
  {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader'
  }
];

module.exports = [
  // Electron Main
  {
    mode: 'development',
    entry: './src/electron.ts',
    devtool: 'source-map',
    target: 'electron-main',
    module: { rules },
    output: {
      path: outputPath,
      filename: 'electron.js'
    }
  },
  // Renderer (React)
  {
    mode: 'development',
    entry: './src/app.tsx',
    devtool: 'source-map',
    target: 'electron-renderer',
    module: { rules },
    output: {
      path: outputPath,
      filename: 'bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/app.html'
      })
    ],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx']
    }
  }
];
