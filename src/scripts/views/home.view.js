define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodItemListItem.view',
        'views/log.view',
        'collections/logItems.collection',
        'collections/foodItems.collection',
        'text!templates/home.tpl.html'
], function($, _, Backbone, FoodItemListItemView, LogView, 
            LogItemsCollection, FoodItemsCollection, homeTemplate) {
    'use strict';
    
    var HomeView = Backbone.View.extend({
       
        // This is the DOM element we are connecting to, located in
        // index.html
        el: '#main-content',
       
        template: _.template(homeTemplate),
        
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
            var logView = new LogView({collection: LogItemsCollection});
            this.$log.append(logView.el);
            return this;
        },
       
        getFoodItems: function() {
            var searchPhrase = this.$searchPhrase.val();
            console.log(searchPhrase);
            var foodItems = FoodItemsCollection({searchPhrase: searchPhrase});
            
            foodItems.fetch({success: this.renderSearchList.bind(this)});
       },
       
        renderSearchList: function(items) {
           var view;
           // Clear the list first
           this.$searchList.html('');
           
           for (var n in items.models) {
               view = new FoodItemListItemView({model: items.models[n]});
               this.$searchList.append(view.render().el);
           }
       }
    });
    
    return HomeView;    
});

