var path = require('path');
var webpack=require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin=require('extract-text-webpack-plugin');

var getHtmlConfig = function (name) {
    return {
        template:'./src/view/' + name + '.html',//需要编译的模板,可以是jade等第三方模板引擎也可以说纯html页面
        filename:'view/' + name + '.html',      //最终生成的文件名,默认是index.html
        inject:true,                     //是否给所有包含的js、css文件后面添加hash值,可以用来清除缓存
        hash:true,                       //设置为true或者body,所有的javascript资源将被放置到body元素的底部，'head'将放置到head元素中。
        chunks:['common',name]        //指定生成的文件index.hmtl需要包括entry里的哪些入口文件
        // (这里是index,common,name.js不会引入),不设置的话所以入口js文件都会被引入进来
    }
}

var config= {
    devtool:'eval-source-map',
    //页面入口文件配置
    entry:{
      'index':['./src/page/index/index.js'] ,
      'login':['./src/page/login/index.js'],
      'common':['./src/page/common/index.js']
    },
    //入口文件输出配置
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: "/dist",//本地服务器所加载的页面所在的目录
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        port:"http://localhost:8000/",
        inline: true//实时刷新
    },
    externals:{
        'jquery':'window.jQuery'
    },
    module:{
        loaders:[
            {
                test:/\.css$/,
                loader:ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader'})
            },
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',//在webpack的module部分的loaders里进行配置即可
            },
            //{test:/\.css$/,loader:"style!css"}
        ]
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'commons',
            filename:'js/base.js'
        }),
        new ExtractTextPlugin({filename:"css/[name].css"}),
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login'))
    ]
};

module.exports =config;