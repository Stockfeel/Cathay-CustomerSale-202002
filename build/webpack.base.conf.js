module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
      app: ["babel-polyfill", "./src/main.js"],
}