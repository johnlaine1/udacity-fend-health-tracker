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
            'click tr.food-item' : 'showAddForm'
        },

        template: _.template(foodListItemTemplate),
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));            
            return this;
        },
        
        showAddForm: function(event) {
            this.$('tr.food-detail').toggle();
        }         
    });
    
    return FoodListItemView;    
});


