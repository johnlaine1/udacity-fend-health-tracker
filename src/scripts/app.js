/* global $ */
var app = app || {};

$(function() {
    'use strict';
    
    new app.AppView();
    new app.FoodLogView({collection: app.logItemsCollection});
});
