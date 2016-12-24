const webpackConfig = require('../webpack/webpack.test.babel')
const argv = require('minimist')(process.argv.slice(2))
const path = require('path')

module.exports = (config) => {
  config.set({
    frameworks: ['mocha', 'intl-shim'],
    reporters: ['coverage', 'mocha'],

    autoWatch: true,
    singleRun: false,

    client: {
      mocha: {
        grep: argv.grep || process.env.GREP,
      },
    },

    files: [
      '../../app/translations/en.json',
      {
        pattern: './test-bundler.js',
        watched: false,
        served: true,
        included: true,
      },
    ],

    preprocessors: {
      ['./test-bundler.js']: ['webpack', 'sourcemap'], // eslint-disable-line no-useless-computed-key
    },

    webpack: webpackConfig,

    // make Webpack bundle generation quiet
    webpackMiddleware: {
      noInfo: true,
      stats: 'errors-only',
    },

    customLaunchers: {
      ChromeTravis: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },

    coverageReporter: {
      dir: path.join(process.cwd(), 'coverage'),
      reporters: [
        { type: 'lcov', subdir: 'lcov' },
        { type: 'html', subdir: 'html' },
        { type: 'text-summary' },
      ],
    },

  })
}
