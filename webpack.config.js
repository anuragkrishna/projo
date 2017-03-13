var path=require("path");
var webpack = require("webpack");

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
        "process.env": {
            BROWSER: JSON.stringify(true), 
            NODE_ENV:JSON.stringify('production')
        }
    }),
    new webpack.optimize.DedupePlugin(), //dedupe similar code 
    new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin()//Merge chunk
  ]
};