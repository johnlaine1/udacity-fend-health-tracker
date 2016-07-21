define([
        'jquery',
        'underscore',
        'backbone',
        'views/logListItem.view',
        'common',
        'text!templates/log.tpl.html',
        'text!templates/logTableHeader.tpl.html',
        'backbonefire'
], function($, _, Backbone, LogListItemView, common, logTemplate, logTableHeaderTemplate) {
    'use strict';
    
    var LogView = Backbone.View.extend({
       
        tagName: 'div',
        
        id: 'log',
       
        events: {
            'change #choose-log-date': 'dateSelect',
            'click #date-clear': 'dateClear'
        },
       
        template: _.template(logTemplate),
        
        tableHeaderTemplate: logTableHeaderTemplate,
       
        initialize: function() {
            _.bindAll(this, 'logLoadError');
            
            // Set up the event listeners
            this.collection.on('all', function(event) {console.log(event);});
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'remove', this.addAll);
            this.listenTo(this.collection, 'logFilter', this.filterLog);
            this.listenTo(this.collection, 'logDateFilter', this.logDateFilter);
        },
       
        render: function() {
            this.$el.html(this.template);
            
            // Cache some jQuery objects.
            this.$progressBar = this.$('.progress-indicator');
            this.$logList = this.$('#log-list');
            
            this.$progressBar.show();
            this.$logList.append(logTableHeaderTemplate);
            
            // In case there is an error connecting to firebase, we will wait
            // 5 seconds and then show a notice to the user. If there is a
            // connection, the 'addOne' method will fire which will remove this
            // timeout.
            // After searching I was unable to find a solution by directly
            // using the firebase API.
            this.fbError = setTimeout(this.logLoadError, 5000);
            return this;
        },
        
        logLoadError: function() {
            this.$progressBar.hide();
            this.$logList.html('<h2>Oops, there seems to have been an error</h2>');            
        },
        
        logDateFilter: function() {
            console.log('logDateFilter triggered: ' + common.logDateFilter);  
        },
        
        dateSelect: function() {
            var date = this.$('#choose-log-date').val();
            var logItems = this.collection.byDate(date);
            
            common.logDateFilter = date;
            this.collection.trigger('logDateFilter');
            console.log(date);
            console.log(common.logDateFilter);
            
            console.log(logItems);
            this.$logList.empty();
            this.$logList.append(logTableHeaderTemplate);            
            _.each(logItems, this.addOne, this);
        },
        
        dateClear: function() {
            this.$('#choose-log-date').val('');
            this.dateSelect();
        },
        
        filterLog: function() {
            if (common.logFilter === 'today') {
                this.$logList.empty();
                this.$logList.append(logTableHeaderTemplate);
                _.each(this.collection.today(), this.addOne, this);
            }
            console.log('The log filter is: ' + common.logFilter);
        },
        
        addOne: function(model) {
            clearTimeout(this.fbError);
            this.$progressBar.hide();
            var view = new LogListItemView({model: model});
            this.$logList.append(view.render().el);
       },
       
        // This will get called on a collection 'reset' event, like when the
        // collection is first populated from the database.
        addAll: function() {
            this.$logList.empty();
            this.$logList.append(logTableHeaderTemplate);
            this.collection.each(this.addOne, this);
       },
       
    });
    
    return LogView;    
});

