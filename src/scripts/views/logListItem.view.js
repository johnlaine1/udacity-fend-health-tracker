define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/logListItem.tpl.html'
], function($, _, Backbone, logListItemTemplate) {
    'use strict';
    
    var LogListItemView = Backbone.View.extend({
       
       tagName: 'tbody',
       
       template: _.template(logListItemTemplate),
       
       events: {},
       
       initialize: function() {},
       
       render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           return this;
       }
    });
    
    return LogListItemView;    
});

