const webpack = require("webpack");
const path = require("path");

module.exports = {
    name: 'server',
    target: 'node',
    entry: { 
        index: [
            "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000",            
            "./src/index.js"
        ]    
    },
    output: {
        path: path.resolve(__dirname, "./public"),
        filename: "[name].bundle.js", 
        publicPath: "/"   
    }, 
    externals: {
        uws: 'uws'
    },
    plugins: [new webpack.HotModuleReplacementPlugin()]
};