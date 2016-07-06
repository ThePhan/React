var config = {
    entry: './main.js',

    output: {
        path: './',
        filename: 'index.js',
    },

    devServer: {
        inline: true,
        port: 3636
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',

            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file',
        }, {
            test: /\.json$/,
            loader: "json"
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    }
}

module.exports = config;
