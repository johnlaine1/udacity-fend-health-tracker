/*global require*/
'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// The shim config allows us to configure dependencies for
	// scripts that do not call define() to register a module
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		}
	},
	paths: {
		jquery: '../lib/jquery/dist/jquery',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone',
		text: '../lib/text/text.js'
	}
});

require([
	'backbone',
	'views/app.view',
	'routers/app.router'
], function (Backbone, AppView, AppRouter) {
	/*jshint nonew:false*/
	// Initialize routing and start Backbone.history()
	new AppRouter();
	Backbone.history.start();

	// Initialize the application view
	new AppView();
});