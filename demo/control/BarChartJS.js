// Provides control it.designfuture.chartjs.BarChartJS
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
	 * @name it.designfuture.chartjs.BarChartJS
	 */
	var BarChartJS =  BaseChartJS.extend("ChartJS.control.BarChartJS", {
		
		metadata : {
			//library: 'it.designfuture.chartjs',
			properties: {
				/**
				 * If the Bar Chart is horizontal
				 */
				isHorizontal : {type : "boolean", group : "Appearance", defaultValue : false},
				
				///////////////////////////////////////////////////////////////////////////////////
				// HOVER
				// The hover configuration is passed into the options.hover namespace. 
				// The global hover configuration is at Chart.defaults.global.hover.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Sets which elements appear in the tooltip.
				 */
				hoverMode : {type : "string", group : "Appearance", defaultValue : "label"},
				
			},
			aggregations: {},
			events: {}
		},
		
		onBeforeRendering: function() {
			this.setChartType(this.getIsHorizontal() ? "horizontalBar" : "bar");
			BaseChartJS.prototype.setHoverMode.call(this, this.getHoverMode());
		},
		
		/////////////////////////////////////
		// OVERRIDE
		/////////////////////////////////////
		
		addGlobalOptions: function(globalOptions) {
		},
		
		//////////////////////////////////////////////
		// GETTER / SETTER
		//////////////////////////////////////////////
		
		
		
		//////////////////////////////////////////////
		// CHART METHODS
		//////////////////////////////////////////////
		
	});


	return BarChartJS;

}, /* bExport= */ true);