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
       
       events: {
            'click tr.food-item': 'showItemDetail',
            'click #delete-log-item': 'deleteLogItem'
       },
       
       initialize: function() {},
       
       render: function() {
           this.$el.html(this.template(this.model.toJSON()));
           return this;
       },
       
       showItemDetail: function() {
            this.$('tr.food-detail').toggle();           
       },
       
       deleteLogItem: function() {
           console.log('deleteLogItem');
           console.log(this.model);
           this.model.destroy();
       }
    });
    
    return LogListItemView;    
});

