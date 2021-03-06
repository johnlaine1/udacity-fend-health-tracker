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


        url: 'https://health-tracker-31fdb.firebaseio.com/logs',

        byDate: function(date) {
            // If a date is passed in, match and return
            if (date) {
                return this.where({log_item_date: date});

                // If no date is passed in, send them all
            } else {
                return this.models;
            }
       }
    });

    return new LogItemsCollection();
});
