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
            return this;
        },
        
        showAddForm: function(event) {
            this.$('tr.food-detail').toggle();
        },
        
        addItemToLog: function(event) {
            event.preventDefault();
            
            var date = this.$('#log-item-date').val();
            var meal = this.$('#log-item-meal').val();
            var qty  = this.$('#log-item-qty').val();
            
            this.model.set('log_item_date', date);
            this.model.set('log_item_meal', meal);
            this.model.set('log_item_qty', qty);

            logItemsCollection.create(this.model.toJSON());
       }        
    });
    
    return FoodListItemView;    
});


