define([
        'jquery',
        'underscore',
        'backbone',
        'views/logListItem.view',
        'common',
        'text!templates/log.tpl.html',
        'text!templates/logTableHeader.tpl.html'
], function($, _, Backbone, LogListItemView, common, logTemplate, logTableHeaderTemplate) {
    'use strict';
    
    var LogView = Backbone.View.extend({
       
        tagName: 'div',
        
        id: 'log',
       
        events: {
            'click li.today': 'renderTodayLog',
            'click li.seven-day': 'renderSevenDayLog',
            'click li.thirty-day': 'renderThirtyDayLog'
        },
       
        template: _.template(logTemplate),
        
        tableHeaderTemplate: logTableHeaderTemplate,
       
        initialize: function() {
           // Set up the event listeners
           this.listenTo(this.collection, 'add', this.addOne);
           this.listenTo(this.collection, 'reset', this.addAll);
           this.listenTo(this.collection, 'logFilter', this.filterLog);
           
           // Fetch the collection associated with this view, it was passed
           // in when the view was instantiated. Setting 'reset' to true will
           // trigger a 'reset' event, not an add event for each model added.
           // this will cause the addAll function to run and therefore populate
           // the view.
           this.collection.fetch({reset: true});
           
           this.render();
        },
       
        render: function() {
            this.$el.html(this.template);
            this.$('#log-list').append(logTableHeaderTemplate);
            return this;
        },
        
        filterLog: function(data) {
            console.log('The log filter is: ' + common.logFilter);
        },
        
        addOne: function(model) {
           var view = new LogListItemView({model: model});
           this.$('#log-list').append(view.render().el);
       },
       
        // This will get called on a collection 'reset' event, like when the
        // collection is first populated from the database.
        addAll: function() {
            this.$('#log-list').empty();
            this.$('#log-list').append(logTableHeaderTemplate);
            this.collection.each(this.addOne, this);
       },
       
       renderTodayLog: function(e) {
            this.$('#log-list').empty();
            this.$('#log-list').append(logTableHeaderTemplate);
            
            _.each(this.collection.today(), this.addOne, this);
       },
       
       renderSevenDayLog: function(e) {
           console.log('7day');
       },
       
       renderThirtyDayLog: function(e) {
           console.log('30day');
       }
    });
    
    return LogView;    
});

