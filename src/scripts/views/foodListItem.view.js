define([
        'jquery',
        'underscore',
        'backbone',
        'collections/logItems.collection',
        'text!templates/foodListItem.tpl.html'
], function($, _, Backbone, logItemsCollection, foodListItemTemplate) {
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
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));            
            return this;
        },
        
        showAddForm: function(event) {
            this.$('tr.food-detail').toggle();
        },
        
        addItemToLog: function(event) {
            event.preventDefault();
            this.model.log_item_date = this.$('#log-item-date').val();
            this.model.log_item_meal = this.$('#log-item-meal').val();
            this.model.log_item_qty = this.$('#log-item-qty').val();
            
            console.log($('#log-item-date').val());
            console.log($('#log-item-meal').val());
            console.log($('#log-item-qty').val());
            console.log(this.model);
            console.log(event);
            logItemsCollection.create(this.model.toJSON());
       }        
    });
    
    return FoodListItemView;    
});


