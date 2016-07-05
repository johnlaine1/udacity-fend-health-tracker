/* global Backbone */

var app = app || {};

(function() {
    'use strict';
    
    app.FoodItemsCollection = Backbone.Collection.extend({
        
        model: app.FoodItem,
        
        initialize: function(options) {
            console.log(options);
            if (options.searchPhrase) {
                this.searchPhrase = options.searchPhrase;
            }
        },
        
        url: function() {
            var appID  = '92d448d9';
            var appKey = '846724b5b7bfc300557cf5140f806791';
            var baseURL = 'https://api.nutritionix.com/v1_1/';
            var type = 'search'; // Must be 'search' or 'item'
            var numResults = '0:3';
            var fields = '*'; // We can list individual fields to return only what we need, a '*' returns everything.
            
            
            return baseURL + type + '/' + this.searchPhrase + '?results=' + numResults + '&fields=' + fields + '&appId=' + appID + '&appKey=' + appKey;
        
        },
        
        parse: function(response) {
            console.log(response.hits);
            return response.hits;
        }
        });
    
})();