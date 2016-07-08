define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodItem.view',
        'text!templates/foodItemListItem.tpl.html'
], function($, _, Backbone, FoodItemView, foodItemListItemTemplate) {
    'use strict';
    
    var FoodItemListItemView = Backbone.View.extend({
        
        tagName: 'li',
        
        template: _.template(foodItemListItemTemplate),
        
        events: {
            'click': 'showItemData'    
        },
        
        render: function() {
            var model = this.model.attributes.fields;
            this.$el.html(this.template({
                model: model
            }));
            
            return this;
        },
        
        showItemData: function(event) {
            var model = this.model.attributes.fields;
            var view = new FoodItemView({model: model});
            view.render().el;
        }
    });
    
    return FoodItemListItemView;    
});


