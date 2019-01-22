/**
 * 生产环境
 */
var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackBaseConfig = require('./webpack.base.config.js');
var fs = require('fs');
var utils = require('./utils')
var CopyWebpackPlugin = require('copy-webpack-plugin')



process.env.NODE_ENV = '"production"';



module.exports = merge(webpackBaseConfig, {
	entry: {
		main: './src/main',
		vendors: ['vue', 'vue-router'],
	},
	output: {
		path: path.join(__dirname, './dist'),
		publicPath: '',
		filename: 'js/[name].[hash].js',
		chunkFilename: 'chunk/[name].[hash].chunk.js',
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': process.env.NODE_ENV,
		}),

		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				drop_debugger: true,
				drop_console: true
			}
		}),
		new HtmlWebpackPlugin({
			filename: './index.html',
			template: path.join(__dirname,'src/template/index.ejs'),
			inject: false,
			hash: false
		}),
		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'js/vendor.bundle.[hash].js'}),

		// new ExtractTextPlugin({filename: 'css/[name].css',  allChunks: true}),

        new CopyWebpackPlugin(
             [
                {
                    from :path.resolve(__dirname,'src/static/js/ea.min.js'),
                    to:path.resolve(__dirname,'dist','js/ea.min.js')
                }
            ]
        ,{
            copyUnmodified: true
        }),

		function () {
			this.plugin("done", function (stats) {
				var buildConfig = path.join(__dirname,'./dist/js/config.js')
				fs.open(buildConfig, 'w', function (err, fd) {
					var buf = `window.globalConfigs = ${JSON.stringify(utils.resolve(require('./index')), null, 4)}`;
					console.log(buf)
					fs.writeSync(fd, buf, 0, buf.length, 0);
					utils.after('./dist',stats.compilation.assets,stats.hash)
				});
			})
		}
	]
});
