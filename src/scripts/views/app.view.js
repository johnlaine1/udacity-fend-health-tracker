/* global Backbone _ jQuery*/
var app = app || {};

(function($) {
    'use strict';
    
    app.AppView = Backbone.View.extend({
       
        // This is the DOM element we are connecting to, located in
        // index.html
        el: '#ht-app',
       
        events: {
            'keyup #search-phrase': 'getFoodItems'
        },
       
        initialize: function() {
            // Render the log view.
            new app.LogView({collection: app.logItemsCollection});
            
            // Cache some variables for later use.
            this.$searchPhrase = this.$('#search-phrase');
            this.$searchList = this.$('#search-list');
       },
       
        getFoodItems: function() {
            var searchPhrase = this.$searchPhrase.val();
            console.log(searchPhrase);
            var foodItems = new app.FoodItemsCollection({searchPhrase: searchPhrase});
            
            foodItems.fetch({success: this.renderSearchList.bind(this)});
       },
       
        renderSearchList: function(items) {
           var view;
           // Clear the list first
           this.$searchList.html('');
           
           for (var n in items.models) {
               view = new app.FoodItemListItemView({model: items.models[n]});
               this.$searchList.append(view.render().el);
           }
       }
    });
    
})(jQuery);