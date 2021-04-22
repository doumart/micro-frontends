const path = require("path")
const { ModuleFederationPlugin } = require("webpack").container;
const dependencies = require("./package.json").dependencies;

module.exports = {
  entry: "./src/bootstrap.js",
  mode: "development",
  devServer: {
    port: 3003,
  },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, '../../build/svelte_app'),
    filename: 'svelte_app_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: 'svelte-loader'
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "svelte_app",
      library: { type: "var", name: "svelte_app" },
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
