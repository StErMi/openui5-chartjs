// Provides control it.designfuture.chartjs.PolarAreaChartJS
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
	 * @name it.designfuture.chartjs.PolarAreaChartJS
	 */
	var PolarAreaChartJS =  BaseChartJS.extend("ChartJS.control.PolarAreaChartJS", {
		
		metadata : {
			//library: 'it.designfuture.chartjs',
			properties: {
				
				/**
				 * Sets the starting angle for the first item in a dataset
				 */
				startAngle : {type : "int", group : "Appearance", defaultValue : -0.5 * Math.PI},
				
				///////////////////////////////////////////////////////////////////////////////////
				// ANIMATION
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * If true, will animate the rotation of the chart.
				 */
				animationAnimateRotate : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * If true, will animate scaling the chart.
				 */
				animationAnimateScale : {type : "boolean", group : "Appearance", defaultValue : true},
				
			},
			aggregations: {},
			events: {}
		},
		
		init: function() {
		},
		
		onBeforeRendering: function() {
			this.setChartType("polarArea");
		},
		
		/////////////////////////////////////
		// OVERRIDE
		/////////////////////////////////////
		
		addGlobalOptions: function(globalOptions) {
			globalOptions.startAngle = this.getStartAngle();
			globalOptions.animation.animateRotate = this.getAnimationAnimateRotate();
			globalOptions.animation.animateScale = this.getAnimationAnimateScale();
		},
		
		//////////////////////////////////////////////
		// GETTER / SETTER
		//////////////////////////////////////////////
		
	});


	return PolarAreaChartJS;

}, /* bExport= */ true);