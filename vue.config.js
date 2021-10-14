// vue.config.js
const path = require('path')



module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        use: [
          require('nib')(),
        ],
        import: [
          path.resolve(__dirname, './app/client/styles/main.styl')
        ],
      },
    },
  },
};


/*
module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))
  },
}

function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './app/client/styles/main.styl'),
      ],
    })
}*/
