define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodItemListItem.view',
        'views/log.view',
        'collections/logItems.collection',
        'collections/foodItems.collection',
        'text!templates/home.tpl.html'
], function($, _, Backbone, FoodItemListItemView, LogView, 
            LogItemsCollection, FoodItemsCollection, homeTemplate) {
    'use strict';
    
    var HomeView = Backbone.View.extend({
        
        tagName: 'div',
        
        id: 'home-view',
        
        events: {
            'keyup #search-phrase': 'getFoodItems'
        },
        
        initialize: function() {
            this.logView = new LogView({collection: LogItemsCollection});
            
        },
        
        render: function() {
            // We need to append the template to the 'main-content first so 
            // that the elements are available to nested views.
            this.$el.html(homeTemplate);
            
            // Cache some variable needed later
            this.$searchPhrase = this.$('#search-phrase');
            this.$searchList = this.$('#search-list');
            this.$log = this.$('#log');
            
            // Render the log view.
            this.$log.html(this.logView.$el);
            
            return this;
        },
       
        getFoodItems: function() {
            var searchPhrase = this.$searchPhrase.val();
            console.log(searchPhrase);
            var foodItems = new FoodItemsCollection({searchPhrase: searchPhrase});
            
            foodItems.fetch({success: this.renderSearchList.bind(this)});
       },
       
        renderSearchList: function(items) {
           var view;
           // Clear the list first
           this.$searchList.html('');
           
           for (var n in items.models) {
               view = new FoodItemListItemView({model: items.models[n]});
               this.$searchList.append(view.render().el);
           }
       }
    });
    
    return HomeView;    
});

