define([
        'jquery',
        'underscore',
        'backbone',
        'collections/logItems.collection',
        'common'
], function($, _, Backbone, logItemsCollection, common) {
    'use strict';

    var AppRouter = Backbone.Router.extend({

        // Define the routes for this router.
        routes: {
            '*logDateFilter': 'setLogDateFilter'
        },

        setLogDateFilter: function(param) {
            // Set the filter to be used on the log view
            common.logDateFilter = param || '';

            // This will trigger a 'logFilter' event, so we can filter the
            // log view
            logItemsCollection.trigger('logDateFilter');
        }
    });

    return AppRouter;
});
