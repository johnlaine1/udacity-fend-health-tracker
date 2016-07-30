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

        class: 'log-items',

        events: {
            'change #choose-log-date': 'dateSelect',
            'click #date-clear': 'dateClear'
        },

        template: _.template(logTemplate),

        tableHeaderTemplate: logTableHeaderTemplate,

        initialize: function() {
            _.bindAll(this, 'logLoadError');

            // Set up the event listeners
            this.listenTo(this.collection, 'add', this.addOne);
            this.listenTo(this.collection, 'remove', this.addAll);
            this.listenTo(this.collection, 'logDateFilter', this.addAll);
        },

        render: function() {
            this.$el.html(this.template);

            // Cache some jQuery objects.
            this.$progressBar = this.$('.progress-indicator');
            this.$logList = this.$('#log-list');
            this.$dateInput = this.$('#choose-log-date');

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

        dateSelect: function() {
            var date = this.$dateInput.val();

            Backbone.history.navigate(date, true);
        },

        dateClear: function() {
            this.$dateInput.val('');
            this.dateSelect();
        },

        addOne: function(model) {
            clearTimeout(this.fbError);
            var item_date = model.attributes.log_item_date;
            var filter_date = common.logDateFilter;

            this.$progressBar.hide();

            if (filter_date === '' || item_date === filter_date) {
                var view = new LogListItemView({model: model});
                this.$logList.append(view.render().el);
            }
        },

        addAll: function() {
            this.$logList.empty();
            this.$logList.append(logTableHeaderTemplate);

            var date = common.logDateFilter;
            var logItems = this.collection.byDate(date);

            _.each(logItems, this.addOne, this);
        }
    });

    return LogView;
});

