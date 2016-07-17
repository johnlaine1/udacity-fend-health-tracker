define([
        'jquery',
        'underscore',
        'backbone',
        'collections/logItems.collection',
        'text!templates/foodItem.tpl.html'
], function($, _, Backbone, logItemsCollection, foodItemTemplate) {
    'use strict';
    
    var FoodItemView = Backbone.View.extend({
       
    //   el: '#food-item-display',
       
       template: _.template(foodItemTemplate),
       
       events: {
           'submit #add-log-item-form': 'addItemToLog'
        //   'click button#add-food-item': 'addItemToLog'
    
       },
       
       initialize: function() {},
       
       render: function() {
           this.$el.html('');
           this.$el.html(this.template({model: this.model}));
           
           return this;
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
            logItemsCollection.create(this.model);
       }
    });
    
    return FoodItemView;    
});




