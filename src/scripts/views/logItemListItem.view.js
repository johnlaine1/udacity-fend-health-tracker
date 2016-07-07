/* global jQuery Backbone _ */
var app = app || {};

(function($) {
    'use strict';
    
    app.LogItemListItemView = Backbone.View.extend({
       
       tagName: 'li',
       
       template: _.template($('#log-item-list-item-tpl').html()),
       
       events: {},
       
       initialize: function() {},
       
       render: function() {
        //   console.log(this.model);
           this.$el.html(this.template({model: this.model}));
           return this;
       }
    });
})(jQuery);