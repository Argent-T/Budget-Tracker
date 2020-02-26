const SWPrecacheWebpackPlugin = require("sw-precache-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry:{
        index: "./public/index.js",
        db: "./public/db.js"
    },
    output: {
        path: __dirname + "/public/dist",
        filename: "[name].bundle.js"
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        }
      ]
    },
    plugins: [
        new SWPrecacheWebpackPlugin({
          cacheId: "my-domain-cache-id",
          dontCacheBustUrlsMatching: /\.\w{8}\./,
          filename: ".client/service-worker.js",
          minify: true,
          staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
        }),
        new WebpackPwaManifest({
          name: "Budget App",
          short_name: "budget",
          description: "An application that allows you to track your income and expenses.",
          background_color: "#01579b",
          theme_color: "#ffffff",
          "theme-color": "#ffffff",
          start_url: "/",
          icons: [{
            src: path.resolve("./public/assets/images/icons/icons-192.png"),
            sizes: [192, 512],
            destination: path.join("assets", "images", "icons")
          }]
        })
      ]

}
module.exports = config;
