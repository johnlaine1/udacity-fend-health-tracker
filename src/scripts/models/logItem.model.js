define([
        'jquery',
        'underscore',
        'backbone'
], function($, _, Backbone) {
    'use strict';
    
    var LogItem = Backbone.Model.extend({
        
        defaults: {
            log_item_date: '',
            log_item_meal: '',
            log_item_qty: '',
            brand_name: '',
            item_name: '',
            item_description: 'Not Available',
            nf_calories: '',
        }
    });
    
    return LogItem;
});
