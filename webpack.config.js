const webpack = require("webpack");

module.exports = {
  mode: "development",
  devtool: "source-map",

  entry: "./src/index.ts",
  
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
  },

	plugins: [
    new webpack.DefinePlugin({
      "node-env": "browser-env"
		})
	],

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          { loader: "ts-loader" }
        ]
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      }
    ]
  },

  output: {
    library: "tlog",
    libraryTarget: "assign",
    filename: "webpack.js"
  }
};
