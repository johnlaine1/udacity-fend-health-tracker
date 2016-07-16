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
            this.render();  
        },
        
        render: function() {
            this.$el.html(this.template);
            this.$searchInput = this.$('#food-search-input');
            this.$searchList = this.$('#food-search-result');            
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
    
    return FoodSearchView;
});