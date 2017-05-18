/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library it.designfuture.chartjs.
 */
sap.ui.define([
	'jquery.sap.global', 
	'sap/ui/core/library' // library dependency
	],  function(jQuery, library) {

		"use strict";

		/**
		 * Suite controls library.
		 *
		 * @namespace
		 * @name it.designfuture.chartjs
		 * @author Emanuele Ricci <stermi@gmail.com>
		 * @version ${version}
		 * @public
		 */


		// Include custom css
		sap.ui.getCore().includeLibraryTheme("it.designfuture.chartjs");
		
		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name : "it.designfuture.chartjs",
			version: "${version}",
			dependencies : ["sap.ui.core", "sap.m"],
			types: [],
			interfaces: [],
			controls: [ 
				"it.designfuture.chartjs.LineChartJS"
			],
			elements: []
		});

		return it.designfuture.qrcode;

}, /* bExport= */ false);