/* global Backbone _ jQuery */
var app = app || {};

(function($) {
    'use strict';
    
    app.AppView = Backbone.View.extend({
       
       el: 'body',
       
       template: _.template($('#app-tpl').html()),
       
       events: {},
       
        initialize: function() {
            this.render();
        },
       
       render: function() {
           this.$el.empty();
           this.$el.append(this.template({}));
           new app.HomeView();
           
           return this;
       }
    });
})(jQuery);