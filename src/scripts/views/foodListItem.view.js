define([
        'jquery',
        'underscore',
        'backbone',
        'collections/logItems.collection',
        'text!templates/foodListItem.tpl.html'
], function($, _, Backbone, logItemsCollection, foodListItemTemplate) {
    'use strict';
    
    var FoodListItemView = Backbone.View.extend({
        
        tagName: 'tr',
        
        className: 'food-item',
        
        id: function() {
            return this.model.get('item_id');
        },

        template: _.template(foodListItemTemplate),
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));            
            return this;
        },
    });
    
    return FoodListItemView;    
});


