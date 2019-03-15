const path = require('path'),
  ProgressBarPlugin = require('progress-bar-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = (env) => {
  let devMode = env === 'dev' ? env : false;

  let conf = {

    entry: './src/js/index.js',
    output: {
      filename: 'js/bundle.js',
      path: path.resolve(__dirname, 'build')
    },
    devtool: devMode ? 'source-map' : false,
    devServer: {
      open: true,
      overlay: true
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader?sourceMap',
            'postcss-loader',
            'sass-loader?sourceMap'
          ],
        },
        {
            test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8000,
                    name(url) {
                        const destination = path.relative(path.resolve(__dirname, 'src'), url);

                        return destination;
                    },
                    publicPath: '..'

                }
            }
        },
      ]
    },
    plugins: [
      new ProgressBarPlugin(),
      new MiniCssExtractPlugin(
        {
          filename: 'css/[name].min.css'
        }
      ),
      new CopyWebpackPlugin([
        {
          from: './src/images',
          to: 'images'
        },
        {
          from: './src/fonts',
          to: 'fonts'
        }
      ]),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html'
      })
    ]
  };

  if (!devMode) {
    conf.plugins.push(new CleanWebpackPlugin())
  }

  if (env === 'babel') {
    conf.module.rules.push(
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    )
  }
  return conf;
};





