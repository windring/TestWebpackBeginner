var HtmlWebpackPlugin=require("html-webpack-plugin");
var ExtractTextPlugin=require("extract-text-webpack-plugin");
module.exports={
  devtool:"eval-source-map",
  entry:__dirname+"/app/main.js",
  output:{
    path:__dirname+"/public",
    filename:"index.js"
  },
  plugins:[
    new HtmlWebpackPlugin({
      path:__dirname+"/public",
      filename:"index.html",
      template:"./app/main.pug"
    }),
    new ExtractTextPlugin("index.css")
  ],
  devServer:{
    contentBase:"./public",
    historyApiFallback:true,
    inline:true
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:["css-loader","postcss-loader"]
        })
      },{
        test:/\.styl$/,
        use:ExtractTextPlugin.extract({
          fallback:"style-loader",
          use:["css-loader","postcss-loader","stylus-loader"]
        })
      },{
        test:/\.pug$/,
        use:[
          {
            loader:"pug-loader"
          }
        ]
      }
    ]
  }
};