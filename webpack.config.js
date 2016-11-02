/**
 * Created by Aamir on 14/01/2016.
 */

var ProgressPlugin = require('webpack/lib/ProgressPlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var combineLoaders = require('webpack-combine-loaders');
var helpers = require('./helpers');

var root = helpers.root;
var modulesRoot = helpers.modulesRoot;
var projectRoot = helpers.projectRoot;

var ENV = process.env.NODE_ENV || "development";
var isProd = ENV.toLowerCase() == "production";
var approot = root('.');
var nodemodules = modulesRoot('.');
var targetPath = projectRoot('./static/js/');

let plugins = [
    new LodashModuleReplacementPlugin({ collections: true, shorthands: true }),
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', chunks: Infinity }),
    new DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify(ENV) } }),
    new LoaderOptionsPlugin({
        debug: !isProd,
        options: {
            resolve: {},
            tslint: {
                emitErrors: !isProd,
                failOnHint: false
            },
            'html-minify-loader': {
                empty: true,
                dom: { lowerCaseAttributeNames: false }
            }
        }
    })
];
let devPlugins = (watchMode) => plugins;
let prodPlugins = (watchMode) => ([
    new LodashModuleReplacementPlugin({ collections: true, shorthands: true }),
    new CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.js', chunks: Infinity }),
    new DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify(ENV) } }),
    new LoaderOptionsPlugin({
        debug: !isProd,
        options: {
            resolve: {},
            tslint: {
                emitErrors: !isProd,
                failOnHint: false
            },
            'html-minify-loader': {
                empty: true,
                dom: { lowerCaseAttributeNames: false }
            }
        }
    }),
    new ProvidePlugin({
        '__metadata': 'ts-helper/metadata',
        '__decorate': 'ts-helper/decorate',
        '__awaiter': 'ts-helper/awaiter',
        '__extends': 'ts-helper/extends',
        '__param': 'ts-helper/param'
    }),
    new UglifyJsPlugin({
        beautify: false,
        mangle: { screw_ie8: true, keep_fnames: true },
        compress: { screw_ie8: true, warnings: false },
        comments: false
    })
]);

var prodRules = [
    {
        test: /\.ts$/,
        loader: combineLoaders([
            {
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    compact: false
                }
            },
            {
                loader: 'ts',
                query: {
                    'compilerOptions': {
                        'removeComments': isProd,
                        'noEmitHelpers': isProd
                    },
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2420, // 2420 -> Class incorrectly implements interface
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ],
                    "configFileName": 'tsconfig.json',
                    'plugins': ['lodash']
                }
            }
        ]),
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
    }
];
var devRules = [
    {
        enforce: 'pre',
        test: /\.ts$/,
        loader: 'tslint',
        exclude: [/node_modules/, /\.d\.ts$/]
    },
    {
        test: /\.ts$/,
        loader: combineLoaders([
            {
                loader: 'babel',
                query: {
                    presets: ['es2015'],
                    compact: false
                }
            },
            {
                loader: 'ts',
                query: {
                    'compilerOptions': {
                        'removeComments': isProd,
                        'noEmitHelpers': isProd
                    },
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2420, // 2420 -> Class incorrectly implements interface
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375  // 2375 -> Duplicate string index signature
                    ],
                    "configFileName": 'tsconfig.json',
                    'plugins': ['lodash']
                }
            },
            { loader: 'angular2-template' }
        ]),
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
    },
    {
        test: /\.html$/,
        loader: combineLoaders([
            { loader: 'raw' },
            { loader: 'html-minify' }
        ])
    }
];

var prodExt = ['.ts', '.js'];
var devExt = ['.ts', '.js', '.html'];

module.exports = function(watchMode) {
    return {
        devtool: 'source-map',
        entry: {
            'vendor': 'app/vendor.ts',
            'app': isProd ? 'app/app.prod.ts' : 'app/app.ts'
        },
        output: {
            path: targetPath,
            publicPath: targetPath,
            filename: '[name].js',
            sourceMapFilename: '[name].map'
        },
        resolve: {
            modules: [approot, nodemodules],
            extensions: isProd ? prodExt : devExt
        },
        module: {
            rules: isProd ? prodRules : devRules
        },
        plugins: isProd ? prodPlugins(watchMode) : devPlugins(watchMode),
        node: {
            global: true,
            progress: true,
            crypto: 'empty',
            module: false,
            clearImmediate: false,
            setImmediate: false
        }
    };
};
