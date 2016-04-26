module.exports = {
    entry: "./app.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: ['node_modules'],
    module: {
        loaders: [
            { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader?limit=8192' },
            { test: /\.css$/, loader: "style!css" }
        ]
    },
    plugins: [
    ]
};