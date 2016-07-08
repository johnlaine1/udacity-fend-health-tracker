/* global Backbone */
var app = app || {};

(function() {
    'use strict';
    
    app.AppRouter = Backbone.Router.extend({
        // Define the routes for this router.
        routes: {
            '*filter': 'setFilter'
        },

        setFilter: function(param) {
            console.log(param);
        }
    });
})();