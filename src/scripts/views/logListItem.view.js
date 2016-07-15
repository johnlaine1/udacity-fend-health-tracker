define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/logItemListItem.tpl.html'
], function($, _, Backbone, logItemListItemTemplate) {
    'use strict';
    
    var LogListItemView = Backbone.View.extend({
       
       tagName: 'li',
       
       template: _.template(logItemListItemTemplate),
       
       events: {},
       
       initialize: function() {},
       
       render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           return this;
       }
    });
    
    return LogListItemView;    
});

