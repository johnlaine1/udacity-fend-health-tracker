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
            brand_name: 'na',
            item_name: 'na',
            item_description: 'Not Available',
            nf_calories: '0',
            nf_total_carbohydrate: '0',
            nf_dietary_fiber: '0',
            nf_protein: '0'

        }
    });

    return LogItem;
});
