/* global Backbone _ jQuery*/
var app = app || {};

(function($) {
    'use strict';
    
    app.HomeView = Backbone.View.extend({
       
        // This is the DOM element we are connecting to, located in
        // index.html
        el: '#main-content',
       
        template: _.template($('#home-tpl').html()),
        
        events: {
            'keyup #search-phrase': 'getFoodItems'
        },
       
        initialize: function() {
            // Make sure the main content is empty.
            this.$el.empty();
            
            // We need to append the template to the 'main-content first so 
            // that the elements are available to nested views.
            this.$el.append(this.template({}));
            
            // Cache some DOM elements for later use.
            this.$searchPhrase = this.$('#search-phrase');
            this.$searchList = this.$('#search-list');
            this.$log = this.$('#log');
        },
        
        render: function() {
            // Render the log view.
            var logView = new app.LogListView({collection: app.logItemsCollection});
            this.$log.append(logView.el);
            
            return this;
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