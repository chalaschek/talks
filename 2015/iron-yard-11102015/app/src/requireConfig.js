/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous/src',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        underscore: '../lib/underscore/underscore',
        backbone: '../lib/backbone/backbone',
        jquery: '../lib/jquery/dist/jquery',
        text: '../lib/text/text'
    },
    packages: [

    ]
});
require(['main']);
