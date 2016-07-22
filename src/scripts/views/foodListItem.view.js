define([
        'jquery',
        'underscore',
        'backbone',
        'collections/logItems.collection',
        'text!templates/foodListItem.tpl.html',
        'text!templates/foodItemDetail.tpl.html'
], function($, _, Backbone, logItemsCollection, foodListItemTemplate, foodItemDetailTemplate) {
    'use strict';
    
    var FoodListItemView = Backbone.View.extend({
        
        tagName: 'tbody',
        
        id: function() {
            return this.model.get('item_id');
        },
        
        events: {
            'click tr.food-item' : 'showAddForm',
            'submit #add-log-item-form': 'addItemToLog'
        },

        template: _.template(foodListItemTemplate),
        
        foodItemDetailTemplate: _.template(foodItemDetailTemplate),
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('.food-detail-content')
                .append(this.foodItemDetailTemplate(this.model.toJSON()));
                
            // Cache some selectors for later use
            this.$date = this.$('#log-item-date');
            this.$meal = this.$('#log-item-meal');
            this.$qty  = this.$('#log-item-qty');
            return this;
        },
        
        showAddForm: function(event) {
            this.$('tr.food-detail').toggle();
        },
        
        addItemToLog: function(event) {
            event.preventDefault();
            
            this.model.set('log_item_date', this.$date.val());
            this.model.set('log_item_meal', this.$meal.val());
            this.model.set('log_item_qty', this.$qty.val());

            logItemsCollection.create(this.model.toJSON());
            
            this.$date.val('');
            this.$meal.val('');
            this.$qty.val('');
            
            // In the case where the log is currently set to a different date
            // than the date of the item being saved. This will prevent it 
            // from showing up in the list.
            logItemsCollection.trigger('logDateFilter');
       }        
    });
    
    return FoodListItemView;    
});


