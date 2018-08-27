let path = require('path');

// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    basePath: '',
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-mocha
      'mocha'
    ],

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      // 'spec',
        'progress',
      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      //  'coverage'
    ],

    files: [
      // // Reference: https://www.npmjs.com/package/phantomjs-polyfill
      // // Needed because React.js requires bind and phantomjs does not support it
      // 'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests/**/*.js'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'tests/**/*.js': ['webpack', 'sourcemap'],
      'app/**/*.js$': ['webpack', 'sourcemap']
    },

    browsers: ['Chrome'],

    singleRun: false,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },

    // // Test webpack config
    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-chrome-launcher',
      'karma-phantomjs-launcher'
    ],

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    },

    babelPreprocessor: {
      options: {
        presets: ['airbnb', 'react', 'stage-0', 'es2015']
      }
    },
    
    autoWatch: true,
    port: 9876,
    colors: true
  });
};

