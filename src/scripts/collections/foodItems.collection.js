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
        
        // Manipulate the data so we get just what we want.
        parse: function(response) {
            var models = [];
            response.hits.forEach(function(data) {
                models.push(data.fields);
            });
            return models;
        }
    });
    
    return new FoodItemsCollection;    
});

        
    