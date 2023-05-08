const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const MemoryFileSystem = require("memory-fs");
const mfs = new MemoryFileSystem();

const fs = require("fs");
const path = require("path");

class ReplaceSizeOnlySourcePlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("ReplaceSizeOnlySourcePlugin", (compilation) => {
      for (const assetName in compilation.assets) {
        const asset = compilation.assets[assetName];
        if (asset.constructor.name === "SizeOnlySource" && asset._source) {
          console.log("Replacing asset:", assetName);
          // Use a try-catch block to handle possible errors when calling asset.source()
          try {
            compilation.assets[assetName] = asset._source;
          } catch (error) {
            console.error(`Failed to replace asset ${assetName}:`, error);
          }
        }
      }
    });
  }
}

// .

const getWebpackFiles = (compiler) =>
  new Promise((resolve, reject) => {
    compiler.outputFileSystem = mfs;
    compiler.inputFileSystem = fs;

    compiler.resolverFactory.hooks.resolver
      .for("normal")
      .tap("memoryFs", (resolver) => {
        resolver.fileSystem = mfs;
      });

    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        const errors =
          err || (stats.compilation ? stats.compilation.errors : null);
        console.log(errors);
        reject(errors);
        return;
      }
      const { compilation } = stats;
      const files = Object.keys(compilation.assets).reduce((acc, key) => {
        const asset = compilation.assets[key];
        try {
          if (typeof asset.source === "function") {
            acc[key] = asset.source();
          }
        } catch (error) {
          if (error.message !== "Content and Map of this Source is not available (only size() is supported)") {
            console.error(`Failed to get source for asset ${key}:`, error);
          }
        }
        return acc;
      }, {});
      resolve(files);
    });
  });




const resolveEntries = targets =>
  Object.keys(targets).reduce((acc, key) => {
    acc[key] = path.resolve(__dirname, "../../", targets[key]);
    return acc;
  }, {});

const getWebpackConfig = targets => ({
  mode: "production",
  devtool: "source-map",
  entry: resolveEntries(targets),
  output: {
    path: path.resolve(__dirname, "../../memory-fs/js/"),
    globalObject: "window"
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
    // ToDo: add more rules and loaders?
  },
  resolve: {
    modules: [path.resolve(__dirname, "../../node_modules"), "node_modules"],
    alias: {
      lozad: path.resolve(__dirname, "../../node_modules/lozad/dist/lozad.min.js"),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      BUILD_NUMBER: Date.now(),
    }),
    new ReplaceSizeOnlySourcePlugin(),
  ],
});

module.exports = {
  compileWebpackTargets: targets =>
    getWebpackFiles(webpack(getWebpackConfig(targets)))
};
