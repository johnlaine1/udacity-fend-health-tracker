define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodSearch.view',
        'views/log.view',
        'collections/logItems.collection',
        'collections/foodItems.collection',
        'text!templates/home.tpl.html'
], function($, _, Backbone, FoodSearchView, LogView, logItemsCollection, foodItemsCollection, homeTemplate) {
    'use strict';
    
    var HomeView = Backbone.View.extend({
        
        tagName: 'div',
        
        id: 'home-view',
        
        template: homeTemplate,
        
        initialize: function() {
            this.logView = new LogView({collection: logItemsCollection});
            this.foodSearchView = new FoodSearchView({collection: foodItemsCollection});
        },
        
        render: function() {
            this.$el.html(this.template);
            this.$('.food-search').html(this.foodSearchView.$el);
            this.$('.log').html(this.logView.$el);

            return this;
        }
    });
    
    return HomeView;    
});

