define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/logListItem.tpl.html',
        'text!templates/foodItemDetail.tpl.html'
], function($, _, Backbone, logListItemTemplate, foodItemDetailTemplate) {
    'use strict';
    
    var LogListItemView = Backbone.View.extend({
       
        tagName: 'tbody',
       
        template: _.template(logListItemTemplate),
       
        foodItemDetailTemplate: _.template(foodItemDetailTemplate),
       
        events: {
            'click tr.food-item': 'showItemDetail',
            'click #delete-log-item': 'deleteLogItem'
        },
       
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            this.$('.food-detail-content').append(this.foodItemDetailTemplate(this.model.toJSON()));
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

