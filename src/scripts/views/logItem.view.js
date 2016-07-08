define([
        'jquery',
        'underscore',
        'backbone',
        'text!templates/logItem.tpl.html'
], function($, _, Backbone, logItemTemplate) {
    'use strict';
    
    var LogItemView = Backbone.View.extend({
       
        el: '',
       
        template: _.template(logItemTemplate),
       
        events: {},
    });
    
    return LogItemView;    
});

