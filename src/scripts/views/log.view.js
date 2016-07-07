/* global jQuery Backbone _ */
var app = app || {};

(function($) {
    'use strict';
    
    app.LogView = Backbone.View.extend({
       
       el: '#log',
       
       events: {},
       
       template: _.template($('#log-tpl').html()),
       
       initialize: function() {
           // Cache references to DOM elements
           this.$list = this.$('#log-list');
           
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
           var view = new app.LogItemListItemView({model: model.attributes});
           this.$list.append(view.render().el);
       },
       
       addAll: function() {
          this.$list.html('');
          this.collection.each(this.addOne, this);
       },
    });
})(jQuery);