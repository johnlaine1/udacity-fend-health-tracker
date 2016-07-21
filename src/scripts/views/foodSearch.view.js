define([
        'jquery',
        'underscore',
        'backbone',
        'common',
        'views/foodListItem.view',
        'text!templates/foodSearch.tpl.html',
        'text!templates/foodSearchTableHeader.tpl.html'
], function($, _, Backbone, common, FoodListItemView, foodSearchTemplate, foodSearchTableHeaderTemplate) {
    'use strict';
    
    var FoodSearchView = Backbone.View.extend({
        
        tagName: 'div',
        
        id: 'food-search',
        
        template: foodSearchTemplate,
        
        tableHeaderTemplate: foodSearchTableHeaderTemplate,
        
        events: {
            'keyup #food-search-input': 'getFoodItems'
            
        },
        
        initialize: function() {
            _.bindAll(this, 'searchFail');
            
            // This template needs to be available right away.
            this.$el.html(this.template);
            
            // Cache variables for later use.
            this.$searchInput = this.$('#food-search-input');
            this.$searchList = this.$('#food-search-result');
            this.$progressBar = this.$('.progress-indicator');
            
            // Set up the event listeners
            this.listenTo(this.collection, 'reset', this.renderSearchList);
        },

        getFoodItems: function() {
            var searchPhrase = this.$searchInput.val();
            
            this.$progressBar.show();
            
            // If the input box is empty, clear the results.
            if (!searchPhrase) {
                this.$progressBar.hide();
                this.collection.reset();
                
                // This is needed to clear out the table headers when there are
                // no results to view
                this.$searchList.empty();
            } else {
            
                var options = {
                    url: this.collection.url + '/' + searchPhrase,
                    reset: true,
                    error: this.searchFail,
                    data: {
                        appId: common.appId,
                        appKey: common.appKey,
                        results: common.numSearchResults,
                        fields: common.searchFields
                    }
                };
                
                this.collection.fetch(options);                
            }
       },
       
        renderSearchList: function() {
            var foodItem;
            
            // Clear out the existing items and hide progress bar.
            this.$progressBar.hide();
            this.$searchList.empty();
            this.$searchList.append(this.tableHeaderTemplate);
            this.collection.each(function(model) {
                foodItem = new FoodListItemView({model: model});
                this.$searchList.append(foodItem.render().el);
            }, this);  
        },
        
        searchFail: function() {
            this.$progressBar.hide();
            this.$searchList.html('<h3 class="search-fail">Oops, it appears that an error has occured</h3>');
            console.log('fail');
        }
    });
    
    return FoodSearchView;
});