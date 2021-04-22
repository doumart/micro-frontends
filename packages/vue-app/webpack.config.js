const path = require("path")
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: "./src/main.js",
  mode: "development",
  devServer: {
    port: 3002,
  },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, '../../build/vue_app'),
    filename: 'vue_app_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue'],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ModuleFederationPlugin({
      name: "vue_app",
      library: { type: "var", name: "vue_app" },
      filename: "remoteEntry.js",
      exposes: {
        "./root": "./src/bootstrap.js",
      },
      shared: {
        ...dependencies,
      },
    }),
  ]
}
