const path = require('path');

/** Babel presets, using instead of `.babelrc` */
const babelPresets = [
    ['@babel/preset-env', {
        'targets': {
            'node': 10
        },
        'modules': false
    }],
    '@babel/preset-react'
];

module.exports = {
    entry: './src/index.jsx',

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true,
                        compact: true,
                        presets: babelPresets
                    }
                }
            },
             /**
             * Stylesheet files.
             */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 0,
                            sourceMap: true
                        }
                    }
                ]
            },

            /**
             * Stylesheet files with SASS.
             */
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },

            /**
             * Make inline in bundle file if smaller than 10 KB,
             * otherwise load as a file.
             */
            {
                test: /\.(png|ico|gif|svg|webp|jpe?g|mp4|webm)(\?[a-z0-9]+)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'public/media/[hash].[ext]'
                    }
                }]
            },

            /**
             * Make font resources load as files.
             */
            {
                test: /\.(eot|ttf|woff2?|otf)$/,
                use: 'file-loader'
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@app': path.resolve(__dirname, '..', 'src'),
            '@public': path.resolve(__dirname, '..', 'public')
        }
    },

    output: {
        path: __dirname + '/public',
        publicPath: '/',
        filename: 'bundle.js'
    },

    devServer: {
        port: 8080,
        contentBase: './public'
    }
};