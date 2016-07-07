/* global Backbone */
var app = app || {};

(function() {
    'use strict';
    
    app.AppRouter = Backbone.Router.extend({
        // Define the routes for this router.
        routes: {
            "": "home"
        },
        
        home: function() {
            new app.HomeView();
            
            console.log('HOME route');
        }
    });
})();