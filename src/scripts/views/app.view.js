define([
        'jquery',
        'underscore',
        'backbone',
        'views/home.tpl.view',
        'text!/templates/app.html'
], function($, _, Backbone, HomeView, appTemplate) {
    'use strict';
    
    var AppView = Backbone.View.extend({
       
        el: 'body',
       
        template: _.template(appTemplate),
       
        events: {},
       
        initialize: function() {
            this.render();
        },
       
        render: function() {
            this.$el.empty();
            this.$el.append(this.template({}));
            new HomeView();
           
            return this;
       }
    });
    
    return AppView;
});
