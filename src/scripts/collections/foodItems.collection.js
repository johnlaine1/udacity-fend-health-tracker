define([
        'jquery',
        'underscore',
        'backbone',
        'models/foodItem.model'
], function($, _, Backbone, FoodItem) {
    'use strict';
    
    var FoodItemsCollection = Backbone.Collection.extend({
        
        model: FoodItem,

        url: 'https://api.nutritionix.com/v1_1/search',
        
        parse: function(response) {
            console.log(response.hits);
            return response.hits;
        }
    });
    
    return new FoodItemsCollection;    
});

        
    