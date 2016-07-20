'use strict';

// Require.js allows us to configure shortcut alias
require.config({
	// This is a hack to prevent caching during development.
	urlArgs: "bust=" + (new Date()).getTime(),
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
		},
		bootstrap: {
			deps: ['jquery']
		}
	},
	paths: {
		jquery: '../lib/jquery/dist/jquery',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap',
		text: '../lib/text/text',
		firebase: '../lib/firebase/firebase',
		backbonefire: 'backbonefire'
	}
});

require([
	'backbone',
	'views/app.view',
	'routers/app.router'
], function (Backbone, AppView, AppRouter) {
	
	// Initialize routing and start Backbone.history()
	new AppRouter();
	Backbone.history.start();
	
	new AppView();
	
	
});