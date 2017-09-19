sap.ui.define(['jquery.sap.global', 'sap/ui/core/Renderer', './BaseChartJSRenderer'],
	function(jQuery, Renderer, BaseChartJSRenderer) {
	"use strict";


	/**
	* PolarChartJS renderer.
	* @static
	* @namespace
	*/
	var PolarAreaChartJSRenderer = Renderer.extend(BaseChartJSRenderer);
	
	/**
	 * Adds control specific class
	 *
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	 */
	PolarAreaChartJSRenderer.addOuterClasses = function(oRm, oControl) {
		oRm.addClass("opeui5-polar-area-chartjs");
	};


	return PolarAreaChartJSRenderer;

}, /* bExport= */ true);