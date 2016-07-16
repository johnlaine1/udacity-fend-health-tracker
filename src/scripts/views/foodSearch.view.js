define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodListItem.view',
        'text!templates/foodSearch.tpl.html'
], function($, _, Backbone, FoodListItemView, foodSearchTemplate) {
    'use strict';
    
    var FoodSearchView = Backbone.View.extend({
        
        tagName: 'div',
        
        id: 'food-search',
        
        template: foodSearchTemplate,
        
        events: {
            'keyup #food-search-input': 'getFoodItems'
        },
        
        initialize: function() {
            // This template needs to be available right away.
            this.$el.html(this.template);
            
            // Cache variables for later use.
            this.$searchInput = this.$('#food-search-input');
            this.$searchList = this.$('#food-search-result');
            
            // Set up the event listeners
            this.listenTo(this.collection, 'reset', this.renderSearchList);
        },

        getFoodItems: function() {
            var searchPhrase = this.$searchInput.val();
            console.log(searchPhrase);
            
            var options = {
                url: this.collection.url + '/' + searchPhrase,
                reset: true,
                data: {
                    appId: '92d448d9',
                    appKey: '846724b5b7bfc300557cf5140f806791',
                    results: '0:5',
                    fields: '*'
                }
            }
            
            this.collection.fetch(options);
       },
       
        renderSearchList: function() {
            var foodItem;
            
            // Clear out the existing items.
            this.$searchList.empty();
            this.collection.each(function(result) {
               foodItem = new FoodListItemView({model: result});
               this.$searchList.append(foodItem.render().el);
            }, this);  
        }
    });
    
    return FoodSearchView;
});