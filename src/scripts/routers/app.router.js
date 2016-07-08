define([
        'jquery',
        'underscore',
        'backbone',
        'views/app.view',
        'views/home.view'
], function($, _, Backbone, AppView, HomeView) {
    'use strict';
    
    var AppRouter = Backbone.Router.extend({
        
        initialize: function() {
            // This is the base html skeleton for the app.
            new AppView();
        },
        
        // Define the routes for this router.
        routes: {
            "": "home"
        },
        
        home: function() {
            new HomeView({el: $('#main-content')});
        }
    });
    
    return AppRouter;    
});
