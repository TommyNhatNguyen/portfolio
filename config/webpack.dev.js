import { merge } from "webpack-merge";
import common from "./webpack.common.js";
import HtmlWebpackPlugin from "html-webpack-plugin";
export default merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "../build",
    hot: true,
    watchFiles: ["src/*.html"],
  },
  optimization: {
    runtimeChunk: "single",
  },
});
