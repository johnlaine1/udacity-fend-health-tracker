define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodListItem.view',
        'views/logAddForm.view',
        'text!templates/foodSearch.tpl.html'
], function($, _, Backbone, FoodListItemView, LogAddFormView, foodSearchTemplate) {
    'use strict';
    
    var FoodSearchView = Backbone.View.extend({
        
        tagName: 'div',
        
        id: 'food-search',
        
        template: foodSearchTemplate,
        
        events: {
            'keyup #food-search-input': 'getFoodItems',
            'click tr.food-item' : 'showAddForm'
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
            
            if (!searchPhrase) {
                this.collection.reset();
            } else {
            
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
            }
       },
       
        renderSearchList: function() {
            var foodItem;
            var logAddForm;
            
            // Clear out the existing items.
            this.$searchList.empty();
            this.collection.each(function(model) {
                foodItem = new FoodListItemView({model: model});
                logAddForm = new LogAddFormView({model: model});
                this.$searchList.append(foodItem.render().el);
                this.$searchList.append(logAddForm.render().el);
            }, this);  
        },
        
        showAddForm: function(event) {
            var itemId = event.currentTarget.id;
            this.$('tr#' + itemId + '.food-detail').toggle();
        },        
    });
    
    return FoodSearchView;
});