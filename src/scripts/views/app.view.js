define([
        'jquery',
        'underscore',
        'backbone',
        'views/home.view',
        'text!templates/app.tpl.html',
        'bootstrap'
], function($, _, Backbone, HomeView, appTemplate) {
    'use strict';
    
    var AppView = Backbone.View.extend({
       
        el: $('body'),
        
        render: function() {
            this.$el.html(appTemplate);
            return this;
        }
    });
    
    return AppView;
});
