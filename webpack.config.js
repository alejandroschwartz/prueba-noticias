const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isDevelopment = argv.mode === 'development';

    return {
        entry: './src/index.js',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: [
                        isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                        'css-loader',
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                    use: [
                        'file-loader',
                    ],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
            }),
            !isDevelopment && new MiniCssExtractPlugin({
                filename: '[name].[contenthash].css',
            }),
        ].filter(Boolean),
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist'),
            },
            compress: true,
            port: 3000,
            hot: true,
        },
    };
};
