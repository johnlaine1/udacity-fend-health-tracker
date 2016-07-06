/* global jQuery Backbone _ */
var app = app || {};

(function($) {
    'use strict';
    
    app.FoodItemView = Backbone.View.extend({
       
       el: '#food-item-display',
       
       template: _.template($('#food-item-tpl').html()),
       
       events: {
           'click button#add-food-item': 'addItemToLog'
       },
       
       initialize: function(options) {
           if (options.model) {
               this.model = options.model;
           }
       },
       
       render: function() {
           this.$el.html('');
           this.$el.html(this.template({model: this.model}));
           
           return this;
       },
       
       addItemToLog: function() {
           console.log(this.model);
           app.logItemsCollection.create(this.model);
       }
    });
})(jQuery);