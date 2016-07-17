define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodItem.view',
        'text!templates/foodListItem.tpl.html'
], function($, _, Backbone, FoodItemView, foodListItemTemplate) {
    'use strict';
    
    var FoodListItemView = Backbone.View.extend({
        
        tagName: 'tr',
        
        className: 'food-item',

        template: _.template(foodListItemTemplate),
        
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
            this.$el.after('<div class="food-info-display">Hello</div>');
            // this.$el.toggleClass('food-info-display');
            var model = this.model.attributes.fields;
            var view = new FoodItemView({
                model: model,
                el: '.food-info-display'
            });
            view.render().el;
            
            
        }
    });
    
    return FoodListItemView;    
});


