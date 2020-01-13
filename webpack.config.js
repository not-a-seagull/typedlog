const webpack = require("webpack");

module.exports = {
  mode: "production",
  devtool: "source-map",

  entry: "./src/index.ts",
  
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".jsx" ]
  },

	plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /\/default\/node-env/,
			".\/default\/browser-env"
		)
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
    library: "typedlog",
    libraryTarget: "assign",
    filename: "webpack.js"
  }
};
