define([
        'jquery',
        'underscore',
        'backbone',
        'views/app.view',
        'views/home.view'
], function($, _, Backbone, AppView, HomeView) {
    'use strict';
    
    var AppRouter = Backbone.Router.extend({
        
        homeView: null,
        
        initialize: function() {
            // This is the base html skeleton for the app.
            new AppView().render();
        },
        
        // Define the routes for this router.
        routes: {
            '': 'home',
            'test': 'test'
        },
        
        home: function() {
            this.homeView = this.homeView || new HomeView();
            $('#main-content').html(this.homeView.render().el);
        },
        
        test: function() {
            console.log('test function');
            $('#main-content').html('The test page');
        }
    });
    
    return AppRouter;    
});
