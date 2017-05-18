// Provides control it.designfuture.chartjs.BubbleChartJS
sap.ui.define([
	"./BaseChartJS",
], function (BaseChartJS) {
	"use strict";
	
	/**
	 * Constructor for a new Chart.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given 
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * QRCode Control to render a QR Code
	 * @extends sap.m.InputBase
	 * @version ${version}
	 *
	 * @constructor
	 * @public
	 * @since 1.40
	 * @name it.designfuture.chartjs.BubbleChartJS
	 */
	var BubbleChartJS =  BaseChartJS.extend("ChartJS.control.BubbleChartJS", {
		
		metadata : {
			//library: 'it.designfuture.chartjs',
			properties: {},
			aggregations: {},
			events: {}
		},
		
		onBeforeRendering: function() {
			this.setChartType("bubble");
		},
		
		/////////////////////////////////////
		// OVERRIDE
		/////////////////////////////////////
		
		addGlobalOptions: function(globalOptions) {},
		
		//////////////////////////////////////////////
		// GETTER / SETTER
		//////////////////////////////////////////////
		
		
		//////////////////////////////////////////////
		// CHART METHODS
		//////////////////////////////////////////////
		
	});


	return BubbleChartJS;

}, /* bExport= */ true);