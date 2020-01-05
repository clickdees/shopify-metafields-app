require("dotenv").config();
const withCSS = require("@zeit/next-css");
const webpack = require("webpack");

const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const accessToken = JSON.stringify(process.env.SHOPIFY_ACCESS_TOKEN);

module.exports = withCSS({
  webpack: config => {
    const env = { API_KEY: apiKey, ACCESS_TOKEN: accessToken };
    config.plugins.push(new webpack.DefinePlugin(env));
    // config.node = { fs: "empty" };
    return config;
  }
});
