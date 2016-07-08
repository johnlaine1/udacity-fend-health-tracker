/* global $ Backbone */
var app = app || {};

$(function() {
    'use strict';
    
    
    
    new app.AppRouter();
    Backbone.history.start();

    new app.AppView();
});
