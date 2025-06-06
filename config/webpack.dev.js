import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "../build"),
    },
    hot: true,
    watchFiles: ["src/**/*.html", "src/**/*.scss", "src/**/*.ts"],
    client: {
      overlay: false,
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
});
