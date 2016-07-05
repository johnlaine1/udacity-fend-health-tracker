/* global Backbone */

var app = app || {};

(function() {
    'use strict';
    
    app.LogItemsCollection = Backbone.Firebase.Collection.extend({
       
       model: app.LogItem,
       
       url: 'https://health-tracker-64b3a.firebaseio.com/logs',
       
       initialize: function() {}
       
       
    });
})();