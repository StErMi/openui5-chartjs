/*!
 * ${copyright}
 */

/**
 * Initialization Code and shared classes of library it.designfuture.flatpickr.
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


		// delegate further initialization of this library to the Core
		sap.ui.getCore().initLibrary({
			name : "it.designfuture.chartjs",
			version: "${version}",
			noLibraryCSS: true,
			dependencies : ["sap.ui.core", "sap.m"],
			types: [],
			interfaces: [],
			controls: [ 
				"it.designfuture.chartjs.BarChartJS",
				"it.designfuture.chartjs.BubbleChartJS",
				"it.designfuture.chartjs.LineChartJS",
				"it.designfuture.chartjs.PieChartJS",
				"it.designfuture.chartjs.PolarAreaChartJS",
				"it.designfuture.chartjs.RadarChartJS"
			],
			elements: []
		});

		return it.designfuture.chartjs;

}, /* bExport= */ false);