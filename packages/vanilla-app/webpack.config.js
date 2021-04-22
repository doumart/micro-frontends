const HTMLWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");

module.exports = (_, argv) => ({
  entry: [
    "core-js/modules/es.promise",
    "core-js/modules/es.array.iterator",
    "./src/index.js"
  ],
  mode: "development",
  devServer: {
    port: 3001,
  },
  output: {
    publicPath: "auto",
    path: path.resolve(__dirname, '../../build'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: [
            ['@babel/preset-env',
              {
                "targets": {
                  "browsers": ["last 2 Chrome versions"]
                }
              }]
          ],
          plugins: ["@babel/plugin-syntax-dynamic-import"]
        }
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
  },
  optimization: {
    runtimeChunk: 'single',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "vanilla_app",
      filename: "remoteEntry.js",
      library: { type: 'var', name: 'vanilla_app' },
      remotes: {
        react_app: "react_app",
        vue_app: "vue_app",
        svelte_app: "svelte_app",
      }
    }),
    new HTMLWebpackPlugin({
      template: argv.mode === "production" ? "public/index_prod.html" : "./public/index.html",
    })
  ]
})
