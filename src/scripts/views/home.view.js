define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodListItem.view',
        'views/log.view',
        'collections/logItems.collection',
        'collections/foodItems.collection',
        'text!templates/home.tpl.html'
], function($, _, Backbone, FoodListItemView, LogView, 
            LogItemsCollection, FoodItemsCollection, homeTemplate) {
    'use strict';
    
    var HomeView = Backbone.View.extend({
        
        tagName: 'div',
        
        id: 'home-view',
        
        template: homeTemplate,
        
        events: {
            'keyup #food-search-input': 'getFoodItems'
        },
        
        initialize: function() {
            this.logView = new LogView({collection: LogItemsCollection});
            
        },
        
        render: function() {
            // We need to append the template to the 'main-content first so 
            // that the elements are available to nested views.
            this.$el.html(this.template);
            
            // Cache some variable needed later
            this.$searchInput = this.$('#food-search-input');
            this.$searchList = this.$('#food-search-result');
            this.$log = this.$('#log');
            
            // Render the log view.
            this.$log.html(this.logView.$el);
            
            return this;
        },
       
        getFoodItems: function() {
            var searchPhrase = this.$searchInput.val();
            console.log(searchPhrase);
            var foodItems = new FoodItemsCollection({searchPhrase: searchPhrase});
            
            foodItems.fetch({success: this.renderSearchList.bind(this)});
       },
       
        renderSearchList: function(items) {
           var view;
           // Clear the list first
           this.$searchList.html('');
           
           for (var n in items.models) {
               view = new FoodListItemView({model: items.models[n]});
               this.$searchList.append(view.render().el);
           }
       }
    });
    
    return HomeView;    
});

