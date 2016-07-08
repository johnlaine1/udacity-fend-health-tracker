define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/logItemListItem.tpl.html'
], function($, _, Backbone, logItemListItemTemplate) {
    'use strict';
    
    var LogItemListItemView = Backbone.View.extend({
       
       tagName: 'li',
       
       template: _.template(logItemListItemTemplate),
       
       events: {},
       
       initialize: function() {},
       
       render: function() {
        //   console.log(this.model);
           this.$el.html(this.template({model: this.model}));
           return this;
       }
    });
    
    return LogItemListItemView;    
});

