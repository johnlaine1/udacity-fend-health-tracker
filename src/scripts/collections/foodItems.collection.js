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
            var models = [];
            console.log(response.hits);
            response.hits.forEach(function(data) {
                models.push(data.fields);
            });
            console.log(models);
            return models;
        }
    });
    
    return new FoodItemsCollection;    
});

        
    