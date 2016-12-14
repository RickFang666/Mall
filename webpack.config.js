var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
console.log(WEBPACK_ENV)

//获取htmlPlugin 参数的方法
var getHtmlConfig = function (name,title){
    return {
      filename: "view/"+name+".html",
      template: "src/view/"+name+".html",
      title: title,
      inject: true,
      hash: true,
      chunks: ['common',name]
    }
}
//webpack config
var config = {
  entry: {
    'common': ['./src/page/common/index.js'],
    'index': ['./src/page/index/index.js'],
    'user-login': ['./src/page/user-login/index.js'],
    'user-register': ['./src/page/user-register/index.js'],
    'user-pass-reset': ['./src/page/user-pass-reset/index.js'],
    'result': ['./src/page/result/index.js']
  },
  output: {
     path: './dist',
     publicPath: '/dist',
     filename: 'js/[name].js',
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  //配置别名
  resolve: {
    alias : {
      node_modules: __dirname + '/node_modules',
      util : __dirname + '/src/util',
      page : __dirname + '/src/page',
      service : __dirname + '/src/service',
      immage : __dirname + '/src/immage',
    }
  },
  plugins: [
  //独立通用模块js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
  //把css单独打包到文件
    new ExtractTextPlugin("css/[name].css"),
  //html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('user-login','登录')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','注册')),
    new HtmlWebpackPlugin(getHtmlConfig('result','结果')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
  ],
    module: {
        loaders: [
            {
            test: /\.css$/,loader:  ExtractTextPlugin.extract("style-loader","css-loader")},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    }
}

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/')
}

  module.exports = config
