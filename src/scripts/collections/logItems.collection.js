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
       
       initialize: function() {},
       
       today: function() {
           var item_date;
           var today = new Date().toDateString();
            
           var filtered = this.filter(function(model) {
               item_date = new Date(model.get('log_item_date')).toDateString();
              return (today === item_date);
           });
           
           console.log(filtered);
           return new LogItemsCollection(filtered);
           
       },
       
       lastSevenDays: function() {
           
       },
       
       lastThirtyDays: function() {
           
       }
    });
    
    return new LogItemsCollection();
});
