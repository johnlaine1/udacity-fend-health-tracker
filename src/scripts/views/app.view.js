define([
        'jquery',
        'underscore',
        'backbone',
        'views/foodSearch.view',
        'views/log.view',
        'collections/logItems.collection',
        'collections/foodItems.collection',
        'text!templates/app.tpl.html'
], function($, _, Backbone, FoodSearchView, LogView, logItemsCollection, foodItemsCollection, appTemplate) {
    'use strict';

    var AppView = Backbone.View.extend({
        el: 'body',

        template: appTemplate,

        initialize: function() {
            this.logView = new LogView({collection: logItemsCollection});
            this.foodSearchView = new FoodSearchView({collection: foodItemsCollection});

            this.render();
        },

        render: function() {
            this.$el.html(this.template);
            this.$('.food-search').html(this.foodSearchView.$el);
            this.$('.log').html(this.logView.render().$el);

            return this;
        }
    });

    return AppView;
});
