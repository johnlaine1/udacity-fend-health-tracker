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
            new AppView().render();
        },
        
        // Define the routes for this router.
        routes: {
            '': 'home',
            'test': 'test'
        },
        
        home: function() {
            // console.log('home function');
            var homeView = new HomeView();
            $('#main-content').html(homeView.render().el);
        },
        
        test: function() {
            console.log('test function');
            this.$mainContent.html('The test page');
        }
    });
    
    return AppRouter;    
});
