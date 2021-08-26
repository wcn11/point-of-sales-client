const path = require("path");

module.exports = {
  //outputDir: path.resolve(__dirname, "../pos_production"),
  devServer: {
    proxy: process.env.VUE_APP_BASE_HOST_API,
  }

  //   assetsDir: "../../static/SPA"
}