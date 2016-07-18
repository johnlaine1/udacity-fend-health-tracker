define([
        'jquery',
        'underscore',
        'backbone'
], function($, _, Backbone) {
    'use strict';
    
    var FoodItem = Backbone.Model.extend({
        
        defaults: {
            item_name: '',
            nf_calories: ''
        }
    });

    return FoodItem;    
});
