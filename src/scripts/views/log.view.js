define([
        'jquery',
        'underscore',
        'backbone',
        'views/logListItem.view',
        'text!templates/log.tpl.html'
], function($, _, Backbone, LogListItemView, logTemplate) {
    'use strict';
    
    var LogView = Backbone.View.extend({
       
        tagName: 'ul',
        
        id: 'log-list',
       
        events: {},
       
        template: _.template(logTemplate),
       
        initialize: function() {
           // Cache references to DOM elements
           
           // Set up the event listeners
           this.listenTo(this.collection, 'add', this.addOne);
           this.listenTo(this.collection, 'reset', this.addAll);
           
           // Fetch the collection associated with this view, it was passed
           // in when the view was instantiated. Setting 'reset' to true will
           // trigger a 'reset' event, not an add event for each model added.
           // this will cause the addAll function to run and therefore populate
           // the view.
           this.collection.fetch({reset: true});
        },
       
        addOne: function(model) {
           var view = new LogListItemView({model: model});
           this.$el.append(view.render().el);
       },
       
        // This will get called on a collection 'reset' event, like when the
        // collection is first populated from the database.
        addAll: function() {
          this.$el.html('');
          this.collection.each(this.addOne, this);
       },
    });
    
    return LogView;    
});

