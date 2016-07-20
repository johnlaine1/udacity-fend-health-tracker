/**
 * This object is available globaly to the app, use for constants
 * config, etc.
 */

'use strict';

define([], function() {
    return {
        // This is the ID for use with the Nutritionix API
        appId: '92d448d9',
        
        // This is the Key for use with the Nutritionix API
        appKey: '846724b5b7bfc300557cf5140f806791',
        
        // This sets the number of results returned from Nutritionix API, max
        // number is 50, first digit is the starting number (usually 0). There
        // is a max per day usage of 400 hits.
        numSearchResults: '0:5',
        
        // These are the fields that should be returned in the results from the
        // Nutritionix API. A '*' returns all fields.
        searchFields: '*',
        
        // Used to filter the results in the log view
        logFilter: ''
    }; 
});