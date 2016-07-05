/* global jQuery Backbone _ */
var app = app || {};

(function($) {
    'use strict';
    
    app.FoodItemListItemView = Backbone.View.extend({
        
        tagName: 'li',
        
        template: _.template($('#food-item-list-item').html()),
        
        events: {
            'click': 'showItemData'    
        },
        
        initialize: function(options) {
            if (options.model) {
                this.model = options.model;
            }
        },
        
        render: function() {
            var model = this.model.attributes.fields;
            this.$el.html(this.template({
                model: model
            }));
            
            return this; // So we can chain methods together.
        },
        
        showItemData: function(event) {
            var model = this.model.attributes.fields;
            var view = new app.FoodItemView({model: model});
            view.render().el;
        }
    });
})(jQuery);