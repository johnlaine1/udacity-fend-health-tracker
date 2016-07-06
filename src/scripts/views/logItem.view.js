/* global jQuery Backbone _ */
var app = app || {};

(function($) {
    'use strict';
    
    app.LogItemView = Backbone.View.extend({
       
       el: '',
       
       template: _.template($('#log-item-tpl').html()),
       
       events: {},
    });
})(jQuery);