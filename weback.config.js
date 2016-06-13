module.exports = {
  entry: {
    "home": "app/comonents/home",
    "list": "app/comonents/list",
    "details": "app/comonents/details"
  },
  loaders: [{
    test: /\*.js$/,
    exclude: /node_modules/,
    loader: "babel"
  }]
}
