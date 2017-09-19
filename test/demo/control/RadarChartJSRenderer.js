sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', './BaseChartJSRenderer'],
	function(jQuery, Renderer, BaseChartJSRenderer) {
	"use strict";


	/**
	* RadarChartJS renderer.
	* @static
	* @namespace
	*/
	var RadarChartJSRenderer = Renderer.extend(BaseChartJSRenderer);
	
	/**
	 * Adds control specific class
	 *
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	 */
	RadarChartJSRenderer.addOuterClasses = function(oRm, oControl) {
		oRm.addClass("opeui5-radar-chartjs");
	};


	return RadarChartJSRenderer;

}, /* bExport= */ true);