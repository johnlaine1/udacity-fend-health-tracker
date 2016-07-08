define([
        'jquery',
        'underscore',
        'backbone',
        'views/home.view'
], function($, _, Backbone, HomeView) {
    'use strict';
    
    var AppRouter = Backbone.Router.extend({
        // Define the routes for this router.
        routes: {
            "": "home"
        },
        
        home: function() {
            new HomeView().render().el;
            console.log('HOME route');
        }
    });
    
    return AppRouter;    
});
