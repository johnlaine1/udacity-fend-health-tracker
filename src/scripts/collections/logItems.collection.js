define([
        'underscore',
        'backbone',
        'models/logItem.model',
        'firebase',
        'backbonefire'
], function(_, Backbone, LogItem) {
    'use strict';
    
    var LogItemsCollection = Backbone.Firebase.Collection.extend({
       // A reference to this collections model.
       model: LogItem,
       
       url: 'https://health-tracker-64b3a.firebaseio.com/logs',
       
       initialize: function() {}
    });
    
    return new LogItemsCollection();
});
