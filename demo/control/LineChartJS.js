// Provides control it.designfuture.chartjs.LineChartJS
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
	 * @name it.designfuture.chartjs.LineChartJS
	 */
	var LineChartJS =  BaseChartJS.extend("ChartJS.control.LineChartJS", {
		
		metadata : {
			//library: 'it.designfuture.chartjs',
			properties: {
				
				/**
				 * If false, the lines between points are not drawn
				 */
				showLines : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * If true, NaN data does not break the line
				 */
				spanGaps : {type : "boolean", group : "Appearance", defaultValue : false},
				
			},
			aggregations: {},
			events: {}
		},
		
		init: function() {
		},
		
		onBeforeRendering: function() {
			this.setChartType("line");
		},
		
		/////////////////////////////////////
		// OVERRIDE
		/////////////////////////////////////
		
		addGlobalOptions: function(globalOptions) {
			globalOptions.showLines = this.getShowLines();
			globalOptions.spanGaps = this.getSpanGaps();
		},
		
		//////////////////////////////////////////////
		// GETTER / SETTER
		//////////////////////////////////////////////
		
		
		
		//////////////////////////////////////////////
		// CHART METHODS
		//////////////////////////////////////////////
		
	});


	return LineChartJS;

}, /* bExport= */ true);