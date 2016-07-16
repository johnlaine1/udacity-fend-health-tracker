define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodItem.view',
        'text!templates/foodListItem.tpl.html'
], function($, _, Backbone, FoodItemView, foodListItemTemplate) {
    'use strict';
    
    var FoodListItemView = Backbone.View.extend({
        
        tagName: 'li',
        
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
            var model = this.model.attributes.fields;
            var view = new FoodItemView({model: model});
            view.render().el;
        }
    });
    
    return FoodListItemView;    
});


