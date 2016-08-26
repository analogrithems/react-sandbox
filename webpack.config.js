const NODE_ENV = process.env.NODE_ENV || 'development';
const dotenv = require('dotenv');

const webpack = require('webpack');
const path = require('path');

const join = path.join;
const resolve = path.resolve;


const isDev = NODE_ENV === 'development';
const isTest = NODE_ENV === 'test';

// devServer config
const devHost   = process.env.HOST || 'localhost';
const devPort   = process.env.PORT || 3000;

const setPublicPath = process.env.SET_PUBLIC_PATH !== 'false';
const publicPath  = (isDev && setPublicPath) ? `//${devHost}:${devPort}/` : '';

const root = resolve(__dirname);
const src = join(root, 'src');
const modules = join(root, 'node_modules');
const dest = join(root, 'dist');
const css = join(src, 'styles');

var HtmlPlugin = require('./html-plugin')
var pick = require('lodash.pick')
var isInstalled = require('./is-installed')

const getConfig = function(spec) {
  var baseConfig = {
    entry: [
      spec.entry
    ],
    output: spec.output,
    resolve: {
      extensions: [
        '',
        '.js',
        '.jsx',
        '.json'
      ]
    },
    plugins: [
      new HtmlPlugin(pick(spec, [
        'html',
        'isDev',
        'serveCustomHtmlInDev',
        'package'
      ]))
    ],
    module: {
      loaders: []
    }
  }

  var optionalBaseLoaders = [
    {
      pkg: 'worker-loader',
      config: {
        test: /(^|\.)worker\.js$/,
        exclude: /node_modules/,
        loaders: ['worker-loader']
      }
    },
    {
      pkg: 'worker-loader',
      config: {
        test: /(^|\.)thread\.js$/,
        exclude: /node_modules/,
        loaders: ['worker-loader?inline']
      }
    },
    {
      pkg: 'babel-loader',
      config: {
        test: /\.(js|jsx|babel)$/,
        include: [__dirname+"/node_modules/dd", __dirname+"/src"],
        loader: 'babel-loader'
      }
    },
    {
      pkg: 'coffee-loader',
      config: {
        test: /\.coffee$/,
        loaders: ['coffee-loader']
      }
    },
    {
      pkg: 'cjsx-loader',
      config: {
        test: /\.cjsx$/,
        loaders: ['coffee-loader', 'cjsx-loader']
      }
    },
    {
      pkg: 'awesome-typescript-loader',
      config: {
        test: /\.(ts|tsx)$/,
        loaders: ['awesome-typescript-loader']
      }
    },
    {
      pkg: 'livescript-loader',
      config: {
        test: /\.ls$/,
        loaders: ['livescript-loader']
      }
    },
    {
      pkg: 'json-loader',
      config: {
        test: /\.json$/,
        loaders: ['json']
      }
    },
    {
      pkg: 'url-loader',
      config: {
        test: /\.otf(\?\S*)?$/,
        loader: 'url-loader?limit=' + spec.urlLoaderLimit
      }
    },
    {
      pkg: 'url-loader',
      config: {
        test: /\.eot(\?\S*)?$/,
        loader: 'url-loader?limit=' + spec.urlLoaderLimit
      }
    },
    {
      pkg: 'url-loader',
      config: {
        test: /\.svg(\?\S*)?$/,
        loader: 'url-loader?mimetype=image/svg+xml&limit=' + spec.urlLoaderLimit
      }
    },
    {
      pkg: 'url-loader',
      config: {
        test: /\.ttf(\?\S*)?$/,
        loader: 'url-loader?mimetype=application/octet-stream&limit=' + spec.urlLoaderLimit
      }
    },
    {
      pkg: 'url-loader',
      config: {
        test: /\.woff2?(\?\S*)?$/,
        loader: 'url-loader?mimetype=application/font-woff&limit=' + spec.urlLoaderLimit
      }
    },
    {
      pkg: 'url-loader',
      config: {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader?limit=' + spec.urlLoaderLimit
      }
    },
    {
      pkg: 'jade-loader',
      config: {
        test: /\.jade$/,
        loaders: ['jade']
      }
    }
  ]

  // Add optional loaders
  optionalBaseLoaders.forEach(function (item) {
    if (isInstalled(item.pkg)) {
      baseConfig.module.loaders.push(item.config)
    }
  })

  // Add optional plugins
  if (isInstalled('yeticss')) {
    baseConfig.stylus = {
      use: [require('yeticss')()]
    }
  }

  if (isInstalled('autoprefixer')) {
    baseConfig.postcss = [require('autoprefixer')()]
  }

  return baseConfig
}



var config = getConfig({
  isDev: isDev || isTest,
  in: join(src, 'app.js'),
  out: dest,
  clearBeforeBuild: true,
  html: function (context) {
    return {
      'index.html': context.defaultTemplate({
        title: 'common',
        publicPath,
        meta: {},
        link: [
          {href: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css', rel:'stylesheet'},
          {href: 'https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css', rel:'stylesheet'}
        ]
      })
    };
  }
});

// ENV variables
const dotEnvVars = dotenv.config();
const environmentEnv = dotenv.config({
  path: join(root, 'config', `${NODE_ENV}.config.js`),
  silent: true
});
const envVariables =
    Object.assign({}, dotEnvVars, environmentEnv);

const defines =
  Object.keys(envVariables)
  .reduce((memo, key) => {
    const val = JSON.stringify(envVariables[key]);
    memo[`__${key.toUpperCase()}__`] = val;
    return memo;
  }, {
    __NODE_ENV__: JSON.stringify(NODE_ENV),
    __DEBUG__: isDev
  });

config.plugins = [
  new webpack.DefinePlugin(defines)
].concat(config.plugins);
// END ENV variables

// CSS modules
const cssModulesNames = `${isDev ? '[path][name]__[local]__' : ''}[hash:base64:5]`;

const matchCssLoaders = /(^|!)(css-loader)($|!)/;

const findLoader = (loaders, match) => {
  const found = loaders.filter(l => l && l.loader && l.loader.match(match));
  return found ? found[0] : null;
};


// existing css loader
const cssloader =
  findLoader(config.module.loaders, matchCssLoaders);

const newloader = Object.assign({}, cssloader, {
  test: /\.module\.css$/,
  include: [src],
  loader: 'style!css'
});
config.module.loaders.push(newloader);
cssloader.test = new RegExp(`[^module]${cssloader.test.source}`);
cssloader.loader = newloader.loader;


config.module.loaders.push({
  test: /\.css$/,
  include: [modules],
  loader: 'style!css'
});

config.module.loaders.push({ 
  test: /bootstrap-sass\/assets\/javascripts\//, 
  loader: 'imports?jQuery=jquery' 
});

config.module.loaders.push({ 
  test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  loader: 'url?limit=10000', 
});

config.module.loaders.push({ 
  test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
  loader: 'file',
});

/*
  
config.devtool = "source-map";

var ExtractTextPlugin = require('extract-text-webpack-plugin');

config.module.loaders.push({
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css!sass')
});

config.plugins.push(
  new ExtractTextPlugin('public/style.css', {
    allChunks: true
  })
);

*/

// CSS modules

// postcss
config.postcss = [].concat([
  require('precss')({}),
  require('autoprefixer')({}),
  require('cssnano')({})
]);

// END postcss

// Roots
config.resolve.root = [src, modules];
config.resolve.alias = {
  css: join(src, 'styles'),
  containers: join(src, 'containers'),
  components: join(src, 'components'),
  utils: join(src, 'utils'),
  styles: join(src, 'styles')
};
// end Roots

// Dev
if (isDev) {
  config.devServer.port = devPort;
  config.devServer.hostname = devHost;
}

// Testing
if (isTest) {
  config.externals = {
    'react/addons': true,
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true
  };

  config.module.noParse = /[/\\]sinon\.js/;
  config.resolve.alias.sinon = 'sinon/pkg/sinon';

  config.plugins = config.plugins.filter(p => {
    const name = p.constructor.toString();
    const fnName = name.match(/^function (.*)\((.*\))/);

    const idx = [
      'DedupePlugin',
      'UglifyJsPlugin'
    ].indexOf(fnName[1]);
    return idx < 0;
  });
}
// End Testing

module.exports = config;
