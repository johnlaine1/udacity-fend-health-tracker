define([
        'jquery',
        'underscore',
        'backbone',
        'collections/logItems.collection',
        'text!templates/logAddForm.tpl.html'
], function($, _, Backbone, logItemsCollection, logAddFormTemplate) {
    'use strict';
    
    var LogAddFormView = Backbone.View.extend({
        
        tagName: 'tr',
        
        className: 'food-detail',
        
        id: function() {
            return this.model.get('item_id');
        },
        
        template: _.template(logAddFormTemplate),
        
        events: {
            'submit #add-log-item-form': 'addItemToLog'
        },
        
        render: function() {
            this.$el.html(this.template(this.model.toJSON()));            
            return this;
        },
        
        addItemToLog: function(event) {
            event.preventDefault();
            this.model.log_item_date = this.$('#log-item-date').val();
            this.model.log_item_meal = this.$('#log-item-meal').val();
            this.model.log_item_qty = this.$('#log-item-qty').val();
            
            console.log($('#log-item-date').val());
            console.log($('#log-item-meal').val());
            console.log($('#log-item-qty').val());
            console.log(this.model);
            console.log(event);
            logItemsCollection.create(this.model.toJSON());
       },   
    });
    
    return LogAddFormView;    
});


