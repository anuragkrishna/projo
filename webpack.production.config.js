var path=require("path");
var webpack = require("webpack");
var CompressionPlugin = require("compression-webpack-plugin");

var DIST_DIR=path.resolve(__dirname,"dist");
var SRC_DIR=path.resolve(__dirname,"src");

module.exports = {

	entry:SRC_DIR + "/index.js",

	output:{

		path: DIST_DIR + "/app",
		filename:"bundle.js",
		publicPath: "/app/"
	},

	module:{
		loaders:[
			{
				test:/\.js$/,
				exclude:/(node_modules)/,
				loader:"babel-loader",
				query: {
					presets:["react","es2015","stage-2"]
				}
			},

			{
				test:/\.css$/,
				loader:"style-loader!css-loader"
			},

			{
				test:/\.(png|jpg)$/,
				loader:"url-loader",
				query: {
    				limit: 8192,
    				name: 'images/[name].[ext]'
					}
			}
		]
	},

	plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'BROWSER': JSON.stringify(true),
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false,
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi]
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0
    })
  ],
};