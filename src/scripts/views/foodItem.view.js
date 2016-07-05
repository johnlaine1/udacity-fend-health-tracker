/* global jQuery Backbone _ */
var app = app || {};

(function($) {
    'use strict';
    
    app.FoodItemView = Backbone.View.extend({
       
       el: '#food-item-display',
       
       template: _.template($('#food-item').html()),
       
       events: {},
       
       initialize: function(options) {
           if (options.model) {
               this.model = options.model;
           }
       },
       
       render: function() {
           this.$el.html('');
           this.$el.html(this.template({model: this.model}));
           
           return this;
       }
    });
})(jQuery);