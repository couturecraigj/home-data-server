const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/client/index.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: "babel-loader"
      }
    ]
  },
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "public", "dist"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "bundle.js",
    publicPath: "/assets/" // string    // the url to the output directory
  }
};
