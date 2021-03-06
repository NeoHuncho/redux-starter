const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist")//this will place app.js in the distribuable file
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 3000
  },
  mode: "development",
  devtool:'source-map'
};
