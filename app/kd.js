/*global Backbone */
'use strict';

var kd = new Backbone.Marionette.Application();

kd.addRegions({
    header: '#header',
    nav: '#nav',
    main: '#main',
    footer: '#footer'
});

kd.on('initialize:after', function () {
    Backbone.history.start();
});