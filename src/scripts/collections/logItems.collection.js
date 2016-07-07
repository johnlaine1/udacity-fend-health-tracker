/* global Backbone */

var app = app || {};

(function() {
    'use strict';
    
    var LogItemsCollection = Backbone.Firebase.Collection.extend({
       // A reference to this collections model.
       model: app.LogItem,
       
       url: 'https://health-tracker-64b3a.firebaseio.com/logs',
       
       initialize: function() {}
    });
    
    app.logItemsCollection = new LogItemsCollection();
})();