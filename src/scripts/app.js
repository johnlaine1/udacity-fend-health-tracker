/* global $ Backbone */
var app = app || {};

$(function() {
    'use strict';
    
    new app.AppView();
    
    new app.AppRouter();
    Backbone.history.start();

});
