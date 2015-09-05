// Karma configuration
// Generated on Mon Apr 27 2015 15:37:59 GMT+0100 (WAT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
        'libs/angular/angular.js',
        'libs/angular-mocks/angular-mocks.js',
        'libs/angular-aria/angular-aria.js',
        'libs/angular-animate/angular-animate.js',
        'libs/angular-material/angular-material.js',
        'libs/angular-route/angular-route.min.js',
        'libs/ngstorage/ngStorage.min.js',
        'app/modules/app.js',
        'app/services/job.services.js',
        'app/services/userservice.js',
        'app/controllers/homectrl.js',
        'app/controllers/jobsctrl.js',
        'app/controllers/userctrl.js',
        'tests/unit test/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
