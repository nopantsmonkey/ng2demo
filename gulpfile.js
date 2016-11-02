var gulp = require("gulp");
var webpack = require("webpack");

var watch = false;
var env = process.env.NODE_ENV || "development";

gulp.task("build", function (cb) {
    var started = false;
    var config = require(`./webpack.config.js`);
    var bundler = webpack(config(watch));
    var verbose = env.toLowerCase() !== "production";

    function bundle (err, stats) {
        if (err) {
            throw new $.util.PluginError('webpack', err);
        }

        var defaultOpts = {
            hash: false,
            version: false,
            timings: false,
            chunks: false,
            chunkModules: false,
            cached: !verbose,
            cachedAssets: !verbose,
            warnings: false
        };

        var quiteModeOpts = {
            quiet: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            children: !verbose,
            cached: !verbose,
            cachedAssets: !verbose,
            errors: false,
            errorDetails: false,
            warnings: false,
            stats: 'errors-only'
        };
        var log = stats.toString(watch ? quiteModeOpts : defaultOpts);
        console.log(log);

        if (!started) {
            started = true;
            return cb();
        }
    }

    if (watch) {
        bundler.watch(200, bundle);
    } else {
        bundler.run(bundle);
    }
});
