/* global jQuery Backbone _ */
var app = app || {};

(function($) {
    'use strict';
    
    app.FoodLogView = Backbone.View.extend({
       
       el: '#log',
       
       events: {},
       
       template: _.template($('#log-tpl').html()),
       
       initialize: function() {
           // Cache references to DOM elements
           this.$list = this.$('#log-list');
           
           // Set up the event listeners
           this.listenTo(this.collection, 'add', this.addOne);
           this.listenTo(this.collection, 'reset', this.addAll);
           
           
           this.collection.fetch({reset: true});
            //   {success: this.render.bind(this)});
       },
       
       addOne: function(model) {
           var view = new app.LogItemListItemView({model: model.attributes});
           this.$list.append(view.render().el);
       },
       
       addAll: function() {
           this.$list.html('');
           console.log('addAll function');
          this.collection.each(this.addOne, this);
       },
    });
})(jQuery);