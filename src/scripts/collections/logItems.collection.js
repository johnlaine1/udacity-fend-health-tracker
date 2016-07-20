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
        //   return this.where({log_item_date: '2016-07-05'});
           
           var item_date;
           var today = new Date().toDateString();
            
           var filtered = this.filter(function(model) {
               item_date = new Date(model.get('log_item_date')).toDateString();
              return (today === item_date);
           });
           return filtered;
           
       },
       
       lastSevenDays: function() {
           
       },
       
       lastThirtyDays: function() {
           
       }
    });
    
    return new LogItemsCollection();
});
