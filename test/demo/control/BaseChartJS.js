// Provides control it.designfuture.chartjs.BaseChartJS
sap.ui.define([
	"sap/ui/core/Control",
	"./thirdparty/chartjs"
], function (Control, chartjs) {
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
	 * @name it.designfuture.chartjs.BaseChartJS
	 */
	var BaseChartJS =  Control.extend("ChartJS.control.BaseChartJS", {
		
		__ctx: undefined,
		__chart: undefined,
		
		metadata : {
			//library: 'it.designfuture.chartjs',
			properties: {
				
				///////////////////////////////////////////////////////////////////////////////////
				// CHART TYPE
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Chart type: line
				 */
				chartType : {type : "string", group : "Appearance", defaultValue : null},
				
				///////////////////////////////////////////////////////////////////////////////////
				// CALLBACKS / FUNCTIONS
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Generates legend items for each thing in the legend. Default implementation returns the text + styling for the color box.
				 */
				generateLabelsCallback : {type : "object", group : "Appearance", defaultValue : null},
				
				/**
				 * Define a function to generate custom tooltip
				 */
				customTooltipCallback : {type : "object", group : "Appearance", defaultValue : null},
				
				/**
				 * Allows sorting of tooltip items. Must implement at minimum a function that can be passed to Array.prototype.sort. 
				 * This function can also accept a third parameter that is the data object passed to the chart.
				 */
				tooltipSortFunction : {type : "object", group : "Appearance", defaultValue : undefined},
				
				/**
				 * Allows filtering of tooltip items. Must implement at minimum a function that can be passed to Array.prototype.filter. 
				 * This function can also accept a second parameter that is the data object passed to the chart.
				 */
				tooltipFilterFunction : {type : "object", group : "Appearance", defaultValue : undefined},
				
				/**
				 * See http://www.chartjs.org/docs/#chart-configuration-tooltip-callbacks
				 */
				tooltipCallbacks : {type : "object", group : "Appearance", defaultValue : {}},
				
				///////////////////////////////////////////////////////////////////////////////////
				// DATA
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Data to be displayed by the Chart. Data structure will change based on the current Chart type
				 */
				datasets : {type : "object", group : "Appearance", defaultValue : null},
				
				/**
				 * Labels of the Chart
				 */
				labels : {type : "object", group : "Appearance", defaultValue : null},
				
				///////////////////////////////////////////////////////////////////////////////////
				// COMMON
				// The following options are applicable to all charts. 
				// The can be set on the global configuration, or they can be passed to the chart constructor.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Resizes the chart canvas when its container does.
				 */
				responsive : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * Duration in milliseconds it takes to animate to new size after a resize event.
				 */
				responsiveAnimationDuration : {type : "int", group : "Appearance", defaultValue : 0},
				
				/**
				 * Maintain the original canvas aspect ratio (width / height) when resizing.
				 */
				maintainAspectRatio : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * Events that the chart should listen to for tooltips and hovering
				 */
				events : {type : "string[]", group : "Appearance", defaultValue : ["mousemove", "mouseout", "click", "touchstart", "touchmove", "touchend"]},
				
				///////////////////////////////////////////////////////////////////////////////////
				// LAYOUT
				// The layout configuration is passed into the options.layout namespace. 
				// The global options for the chart layout is defined in Chart.defaults.global.layout.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * The padding to add inside the chart. If this value is a number, it is applied to all sides of the chart (left, top, right, bottom).
				 * If this value is an object, the left property defines the left padding. Similarly the right, top, and bottom properties can also be specified.
				 */
				layoutPadding : {type : "object", group : "Appearance", defaultValue : 0},
				
				///////////////////////////////////////////////////////////////////////////////////
				// TITLE
				// The title configuration is passed into the options.title namespace. 
				// The global options for the chart title is defined in Chart.defaults.global.title.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Title text
				 */
				titleText : {type : "string", group : "Appearance", defaultValue : ""},
				
				/**
				 * Display the title block
				 */
				titleDisplay : {type : "boolean", group : "Appearance", defaultValue : false},
				
				/**
				 * Position of the title. Possible values are 'top', 'left', 'bottom' and 'right'.
				 */
				titlePosition : {type : "string", group : "Appearance", defaultValue : "top"},
				
				/**
				 * Marks that this box should take the full width of the canvas (pushing down other boxes)
				 */
				titleFullWidth : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * Font size inherited from global configuration
				 */
				titleFontSize : {type : "int", group : "Appearance", defaultValue : 12},
				
				/**
				 * Font family inherited from global configuration
				 */
				titleFontFamily : {type : "string", group : "Appearance", defaultValue : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"},
				
				/**
				 * Font color inherited from global configuration
				 */
				titleFontColor : {type : "string", group : "Appearance", defaultValue : "#666"},
				
				/**
				 * Font styling of the title.
				 */
				titleFontStyle : {type : "string", group : "Appearance", defaultValue : "bold"},
				
				/**
				 * Number of pixels to add above and below the title text
				 */
				titlePadding : {type : "int", group : "Appearance", defaultValue : 10},
				
				///////////////////////////////////////////////////////////////////////////////////
				// LEGEND
				// The legend configuration is passed into the options.legend namespace. The global options for the chart legend 
				// is defined in Chart.defaults.global.legend.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Width of coloured box
				 */
				legendDisplay : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * Position of the legend. Possible values are 'top', 'left', 'bottom' and 'right'.
				 */
				legendPosition : {type : "string", group : "Appearance", defaultValue : "top"},
				
				/**
				 * Marks that this box should take the full width of the canvas (pushing down other boxes)
				 */
				legendFullWidth : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * Legend will show datasets in reverse order
				 */
				legendReverse : {type : "boolean", group : "Appearance", defaultValue : false},
				
				///////////////////////////////////////////////////////////////////////////////////
				// LEGEND LABEL
				// The legend label configuration is nested below the legend configuration using the labels key.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Width of coloured box
				 */
				legendLabelBoxWidth : {type : "int", group : "Appearance", defaultValue : 40},
				
				/**
				 * Font size inherited from global configuration
				 */
				legendLabelFontSize : {type : "int", group : "Appearance", defaultValue : 12},
				
				/**
				 * Font family inherited from global configuration
				 */
				legendLabelFontStyle : {type : "string", group : "Appearance", defaultValue : "normal"},
				
				/**
				 * Font color inherited from global configuration
				 */
				legendLabelFontColor : {type : "string", group : "Appearance", defaultValue : "#666"},
				
				/**
				 * Font family inherited from global configuration
				 */
				legendLabelFontFamily : {type : "string", group : "Appearance", defaultValue : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"},
				
				/**
				 * Padding between rows of colored boxes
				 */
				legendLabelPadding : {type : "int", group : "Appearance", defaultValue : 10},
				
				/**
				 * Label style will match corresponding point style (size is based on fontSize, boxWidth is not used in this case).
				 */
				legendLabelUsePointStyle : {type : "boolean", group : "Appearance", defaultValue : false},
				
				///////////////////////////////////////////////////////////////////////////////////
				// TOOLTOP
				// The tooltip configuration is passed into the options.tooltips namespace.
				// The global options for the chart tooltips is defined in Chart.defaults.global.tooltips.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Are tooltips enabled
				 */
				tooltipEnabled : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * Sets which elements appear in the tooltip
				 */
				tooltipMode : {type : "string", group : "Appearance", defaultValue : "nearest"},
				
				/**
				 * if true, the tooltip mode applies only when the mouse position intersects with an element. 
				 * If false, the mode will be applied at all times.
				 */
				tooltipIntersect : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * The mode for positioning the tooltip. 'average' mode will place the tooltip at the average position of the items displayed in the tooltip. 
				 * 'nearest' will place the tooltip at the position of the element closest to the event position. 
				 * New modes can be defined by adding functions to the Chart.Tooltip.positioners map.
				 */
				tooltipPosition : {type : "string", group : "Appearance", defaultValue : "average"},
				
				/**
				 * Background color of the tooltip
				 */
				tooltipBackgroundColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.8)"},
				
				/**
				 * Font family for tooltip title inherited from global font family
				 */
				tooltipTitleFontFamily : {type : "string", group : "Appearance", defaultValue : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"},
				
				/**
				 * Font size for tooltip title inherited from global font size
				 */
				tooltipTitleFontSize : {type : "int", group : "Appearance", defaultValue : 12},
				
				/**
				 * Font size for tooltip title inherited from global font size
				 */
				tooltipTitleFontStyle : {type : "string", group : "Appearance", defaultValue : "bold"},
				
				/**
				 * Font color for tooltip title
				 */
				tooltipTitleFontColor : {type : "string", group : "Appearance", defaultValue : "#fff"},
				
				/**
				 * Spacing to add to top and bottom of each title line.
				 */
				tooltipTitleSpacing : {type : "int", group : "Appearance", defaultValue : 2},
				
				/**
				 * Margin to add on bottom of title section
				 */
				tooltipTitleMarginBottom : {type : "int", group : "Appearance", defaultValue : 2},
				
				/**
				 * Font family for tooltip items inherited from global font family
				 */
				tooltipBodyFontFamily : {type : "string", group : "Appearance", defaultValue : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"},
				
				/**
				 * Font size for tooltip items inherited from global font size
				 */
				tooltipBodyFontSize : {type : "int", group : "Appearance", defaultValue : 12},
				
				/**
				 * Font size for tooltip items inherited from global font size
				 */
				tooltipBodyFontStyle : {type : "string", group : "Appearance", defaultValue : "normal"},
				
				/**
				 * Font color for tooltip items.
				 */
				tooltipBodyFontColor : {type : "string", group : "Appearance", defaultValue : "#fff"},
				
				/**
				 * Spacing to add to top and bottom of each tooltip item
				 */
				tooltipBodySpacing : {type : "int", group : "Appearance", defaultValue : 2},
				
				/**
				 * Font family for tooltip footer inherited from global font family.
				 */
				tooltipFooterFontFamily : {type : "string", group : "Appearance", defaultValue : "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"},
				
				/**
				 * Font size for tooltip footer inherited from global font size.
				 */
				tooltipFooterFontSize : {type : "int", group : "Appearance", defaultValue : 12},
				
				/**
				 * Font style for tooltip footer.
				 */
				tooltipFooterFontStyle : {type : "string", group : "Appearance", defaultValue : "bold"},
				
				/**
				 * #fff
				 */
				tooltipFooterFontColor : {type : "string", group : "Appearance", defaultValue : "#fff"},
				
				/**
				 * Spacing to add to top and bottom of each footer line.
				 */
				tooltipFooterSpacing : {type : "int", group : "Appearance", defaultValue : 2},
				
				/**
				 * Margin to add before drawing the footer
				 */
				tooltipFooterMarginTop : {type : "int", group : "Appearance", defaultValue : 6},
				
				/**
				 * Padding to add on left and right of tooltip
				 */
				tooltipXPadding : {type : "int", group : "Appearance", defaultValue : 6},
				
				/**
				 * Padding to add on top and bottom of tooltip
				 */
				tooltipYPadding : {type : "int", group : "Appearance", defaultValue : 6},
				
				/**
				 * Size, in px, of the tooltip arrow
				 */
				tooltipCaretSize : {type : "int", group : "Appearance", defaultValue : 5},
				
				/**
				 * Radius of tooltip corner curves
				 */
				tooltipCornerRadius : {type : "int", group : "Appearance", defaultValue : 6},
				
				/**
				 * Color to draw behind the colored boxes when multiple items are in the tooltip
				 */
				tooltipMultiKeyBackground : {type : "string", group : "Appearance", defaultValue : "#fff"},
				
				/**
				 * if true, color boxes are shown in the tooltip
				 */
				tooltipDisplayColors : {type : "boolean", group : "Appearance", defaultValue : true},
				
				///////////////////////////////////////////////////////////////////////////////////
				// HOVER
				// The hover configuration is passed into the options.hover namespace. 
				// The global hover configuration is at Chart.defaults.global.hover.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Sets which elements appear in the tooltip.
				 */
				hoverMode : {type : "string", group : "Appearance", defaultValue : "nearest"},
				
				/**
				 * if true, the hover mode only applies when the mouse position intersects an item on the chart
				 */
				hoverIntersect : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * Duration in milliseconds it takes to animate hover style changes
				 */
				hoverAnimationDuration : {type : "int", group : "Appearance", defaultValue : 400},
				
				///////////////////////////////////////////////////////////////////////////////////
				// ANIMATION
				// The following animation options are available. The global options for are defined in Chart.defaults.global.animation.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * The number of milliseconds an animation takes.
				 */
				animationDuration : {type : "int", group : "Appearance", defaultValue : 1000},
				
				/**
				 * Easing function to use. Available options are: 'linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 
				 * 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 
				 * 'easeInOutQuint', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInCirc', 
				 * 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 
				 * 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce'
				 */
				animationEasing : {type : "string", group : "Appearance", defaultValue : "easeOutQuart"},
				
				///////////////////////////////////////////////////////////////////////////////////
				// ARC
				// Arcs are used in the polar area, doughnut and pie charts. They can be configured with the following options. 
				// The global arc options are stored in Chart.defaults.global.elements.arc.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Default fill color for arcs. Inherited from the global default
				 */
				arcBackgroundColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.1)"},
				
				/**
				 * Default stroke color for arcs
				 */
				arcBorderColor : {type : "string", group : "Appearance", defaultValue : "#fff"},
				
				/**
				 * Default stroke width for arcs
				 */
				arcBorderWidth : {type : "int", group : "Appearance", defaultValue : 2},
				
				///////////////////////////////////////////////////////////////////////////////////
				// LINE
				// Line elements are used to represent the line in a line chart. 
				// The global line options are stored in Chart.defaults.global.elements.line.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Default bezier curve tension. Set to 0 for no bezier curves.
				 */
				lineTension : {type : "int", group : "Appearance", defaultValue : 0.4},
				
				/**
				 * Default line fill color
				 */
				lineBackgroundColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.1)"},
				
				/**
				 * Default line stroke width
				 */
				lineBorderWidth : {type : "int", group : "Appearance", defaultValue : 3},
				
				/**
				 * Default line stroke color
				 */
				lineBorderColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.1)"},
				
				/**
				 * Default line cap style.
				 */
				lineBorderCapStyle : {type : "string", group : "Appearance", defaultValue : "butt"},
				
				/**
				 * Default line dash. 
				 */
				lineBorderDash : {type : "int[]", group : "Appearance", defaultValue : []},
				
				/**
				 * Default line dash offset.
				 */
				lineBorderDashOffset : {type : "int", group : "Appearance", defaultValue : 0.0},
				
				/**
				 * Default line join style.
				 */
				lineBorderJoinStyle : {type : "string", group : "Appearance", defaultValue : "miter"},
				
				/**
				 * If true, bezier control points are kept inside the chart. If false, no restriction is enforced.
				 */
				lineCapBezierPoints : {type : "boolean", group : "Appearance", defaultValue : true},
				
				/**
				 * If true, the fill is assumed to be to zero. String values are 'zero', 'top', and 'bottom' to fill to different locations. 
				 * If false, no fill is added
				 */
				lineFill : {type : "object", group : "Appearance", defaultValue : true},
				
				/**
				 * If true, the line is shown as a stepped line and 'tension' will be ignored
				 */
				lineStepped : {type : "boolean", group : "Appearance", defaultValue : false},
				
				///////////////////////////////////////////////////////////////////////////////////
				// POINT
				// Point elements are used to represent the points in a line chart or a bubble chart. 
				// The global point options are stored in Chart.defaults.global.elements.point.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Default point radius
				 */
				pointRadius : {type : "int", group : "Appearance", defaultValue : 3},
				
				/**
				 * Default point style
				 */
				pointStyle : {type : "string", group : "Appearance", defaultValue : "circle"},
				
				/**
				 * Default point fill color
				 */
				pointBackgroundColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.1)"},
				
				/**
				 * Default point stroke width
				 */
				pointBorderWidth : {type : "int", group : "Appearance", defaultValue : 1},
				
				/**
				 * Default point stroke color
				 */
				pointBorderColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.1)"},
				
				/**
				 * Extra radius added to point radius for hit detection
				 */
				pointHitRadius : {type : "string", group : "Appearance", defaultValue : "circle"},
				
				/**
				 * Default point radius when hovered
				 */
				pointHoverRadius : {type : "int", group : "Appearance", defaultValue : 4},
				
				/**
				 * Default stroke width when hovered
				 */
				pointHoverBorderWidth : {type : "int", group : "Appearance", defaultValue : 1},
				
				///////////////////////////////////////////////////////////////////////////////////
				// RECTANGLE
				// Rectangle elements are used to represent the bars in a bar chart. 
				// The global rectangle options are stored in Chart.defaults.global.elements.rectangle.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Default bar fill color
				 */
				rectangleBackgroundColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.1)"},
				
				/**
				 * Default bar stroke width
				 */
				rectangleBorderWidth : {type : "int", group : "Appearance", defaultValue : 1},
				
				/**
				 * Default bar stroke color
				 */
				rectangleBorderColor : {type : "string", group : "Appearance", defaultValue : "rgba(0,0,0,0.1)"},
				
				/**
				 * Default skipped (excluded) border for rectangle. Can be one of bottom, left, top, right
				 */
				rectangleBorderSkipped : {type : "string", group : "Appearance", defaultValue : "bottom"},
				
				///////////////////////////////////////////////////////////////////////////////////
				// SCALE
				// Rectangle elements are used to represent the bars in a bar chart. 
				// The global rectangle options are stored in Chart.defaults.global.elements.rectangle.
				///////////////////////////////////////////////////////////////////////////////////
				
				/**
				 * Chart scales. More information: http://www.chartjs.org/docs/#scales-common-configuration
				 */
				scales : {type : "object", group : "Appearance", defaultValue : null},
				
			},
			aggregations: {},
			events: {
				
				/**
				 * Called if the event is of type 'mouseup' or 'click'. Called in the context of the chart and passed the event and an array of active elements
				 */
				onClick: {
					parameters: {
						/**
						 * Event
						 */
						event: { type: "object" },
						
						/**
						 * Acive object clicked
						 */
						activeElements: { type: "object[]" }
					}
				},
				
				/**
				 * Called when any of the events fire. Called in the context of the chart and passed the event and an array of active elements (bars, points, etc)
				 */
				onHover: {
					parameters: {
						/**
						 * Event
						 */
						event: { type: "object" },
						
						/**
						 * Acive object clicked
						 */
						activeElements: { type: "object[]" }
					}
				},
				
				/**
				 * Called when a resize occurs. Gets passed two arguments: the chart instance and the new size.
				 */
				onResize: {
					parameters: {
						/**
						 * Chart
						 */
						chart: { type: "object" },
						
						/**
						 * New resized size of the chart
						 */
						newSize: { type: "object" }
					}
				},
				
				/**
				 * A callback that is called when a 'click' event is registered on top of a label item
				 */
				onLegendItemClick: {
					parameters: {
						/**
						 * Event
						 */
						event: { type: "object" },
						
						/**
						 * Legend item clicked
						 */
						legendItem: { type: "object" }
					}
				},
				
				/**
				 * A callback that is called when a 'mousemove' event is registered on top of a label item
				 */
				onLegendItemHover: {
					parameters: {
						/**
						 * Event
						 */
						event: { type: "object" },
						
						/**
						 * Legend item clicked
						 */
						legendItem: { type: "object" }
					}
				},
				
				/**
				 * Callback called at the end of an animation. Passed the same arguments as onProgress
				 */
				onAnimationProgress: {
					parameters: {
						/**
						 * Animation object composed by the chart instance and animaton detail
						 */
						animation: { type: "object" },
					}
				},
				
				/**
				 * Callback called on each step of an animation. Passed a single argument, an object, containing the 
				 * chart instance and an object with details of the animation.
				 */
				onAnimationComplete: {
					parameters: {
						/**
						 * Animation object composed by the chart instance and animaton detail
						 */
						animation: { type: "object" },
					}
				},
				
				
			},
		},
		
		onAfterRendering: function() {
			var that = this;
			var titleOptions = {
				display: this.getTitleDisplay(),
				position: this.getTitlePosition(),
				text: this.getTitleText()
			};
			
			var layoutOptions = {
				padding: this.getLayoutPadding() 
			};
			
			var titleOptions = {
				display: this.getTitleDisplay(),
				position: this.getTitlePosition(),
				fullWidth: this.getTitleFullWidth(),
				fontSize: this.getTitleFontSize(),
				fontFamily: this.getTitleFontFamily(),
				fontColor: this.getTitleFontColor(),
				fontStyle: this.getTitleFontStyle(),
				padding: this.getTitlePadding(),
				text: this.getTitleText()
			};
			
			var legendLabelOptions = {
				boxWidth: this.getLegendLabelBoxWidth(),
				fontSize: this.getLegendLabelFontSize(),
				fontStyle: this.getLegendLabelFontStyle(),
				fontColor: this.getLegendLabelFontColor(),
				fontFamily: this.getLegendLabelFontFamily(),
				padding: this.getLegendLabelPadding(),
				usePointStyle: this.getLegendLabelUsePointStyle()
			};
			
			if( this.getGenerateLabelsCallback() ) {
				legendLabelOptions.generateLabels = this.getGenerateLabelsCallback();
			}
			
			var legendOptions = {
				display: this.getLegendDisplay(),
				position: this.getLegendPosition(),
				fullWidth: this.getLegendFullWidth(),
				reverse: this.getLegendReverse(),
				labels: legendLabelOptions,
				onClick: function(event, legendItem) {
		    		that.fireOnLegendItemClick({event: event, legendItem: legendItem});
		    	},
				onHover: function(event, legendItem) {
		    		that.fireOnLegendItemHover({event: event, legendItem: legendItem});
		    	},
			};
			
			var tooltipOptions = {
				enabled: this.getTooltipEnabled(),
				mode: this.getTooltipMode(),
				intersect: this.getTooltipIntersect(),
				position: this.getTooltipPosition(),
				backgroundColor: this.getTooltipBackgroundColor(),
				titleFontFamily: this.getTooltipTitleFontFamily(),
				titleFontSize: this.getTooltipTitleFontSize(),
				titleFontStyle: this.getTooltipTitleFontStyle(),
				titleFontColor: this.getTooltipTitleFontColor(),
				titleSpacing: this.getTooltipTitleSpacing(),
				titleMarginBottom: this.getTooltipTitleMarginBottom(),
				bodyFontFamily: this.getTooltipBodyFontFamily(),
				bodyFontSize: this.getTooltipBodyFontSize(),
				bodyFontStyle: this.getTooltipBodyFontStyle(),
				bodyFontColor: this.getTooltipBodyFontColor(),
				bodySpacing: this.getTooltipBodySpacing(),
				footerFontFamily: this.getTooltipFooterFontFamily(),
				footerFontSize: this.getTooltipFooterFontSize(),
				footerFontStyle: this.getTooltipFooterFontStyle(),
				footerFontColor: this.getTooltipFooterFontColor(),
				footerSpacing: this.getTooltipFooterSpacing(),
				footerMarginTop: this.getTooltipFooterMarginTop(),
				xPadding: this.getTooltipXPadding(),
				yPadding: this.getTooltipYPadding(),
				caretSize: this.getTooltipCaretSize(),
				cornerRadius: this.getTooltipCornerRadius(),
				multiKeyBackground: this.getTooltipMultiKeyBackground(),
				displayColors: this.getTooltipDisplayColors(),
				custom: this.getCustomTooltipCallback(),
				itemSort: this.getTooltipSortFunction(),
				filter: this.getTooltipFilterFunction(),
				callbacks: this.getTooltipCallbacks()
			};
			
			// if( this.getTooltipCallbacks() ) tooltipOptions.callbacks = this.getTooltipCallbacks();
			
			var hoverOptions = {
				mode: this.getHoverMode(),
				intersect: this.getHoverIntersect(),
				animationDuration: this.getHoverAnimationDuration(),
			};
			
			var animationOptions = {
				duration: this.getAnimationDuration(),
				easing: this.getAnimationEasing(),
				onProgress: function(animation) {
		    		that.fireOnAnimationProgress({animation: animation});
		    	},
				onComplete: function(animation) {
		    		that.fireOnAnimationComplete({animation: animation});
		    	},
			};
			
			var arcOptions = {
				backgroundColor: this.getArcBackgroundColor(),
				borderColor: this.getArcBorderColor(),
				borderWidth: this.getArcBorderWidth()
			};
			
			var lineOptions = {
				tension: this.getLineTension(),
				backgroundColor: this.getLineBackgroundColor(),
				borderWidth: this.getLineBorderWidth(),
				borderColor: this.getLineBorderColor(),
				borderCapStyle: this.getLineBorderCapStyle(),
				borderDash: this.getLineBorderDash(),
				borderDashOffset: this.getLineBorderDashOffset(),
				borderJoinStyle: this.getLineBorderJoinStyle(),
				capBezierPoints: this.getLineCapBezierPoints(),
				fill: this.getLineFill(),
				stepped: this.getLineStepped()
			};
			
			var pointOptions = {
				radius: this.getPointRadius(),
				pointStyle: this.getPointStyle(),
				backgroundColor: this.getPointBackgroundColor(),
				borderWidth: this.getPointBorderWidth(),
				borderColor: this.getPointBorderColor(),
				hitRadius: this.getPointHitRadius(),
				hoverRadius: this.getPointHoverRadius(),
				hoverBorderWidth: this.getPointHoverBorderWidth()
			};
			
			var rectangleOptions = {
				backgroundColor: this.getRectangleBackgroundColor(),
				borderWidth: this.getRectangleBorderWidth(),
				borderColor: this.getRectangleBorderColor(),
				borderSkipped: this.getRectangleBorderSkipped()
			};
			
			var globalOptions = {
		    	onClick: function(event, activeElements) {
		    		that.fireOnClick({event: event, activeElements: activeElements});
		    	},
		    	onHover: function(event, activeElements) {
		    		that.fireOnHover({event: event, activeElements: activeElements});
		    	},
		    	onResize: function(chart, newSize) {
		    		that.fireOnResize({chart: chart, newSize: newSize});
		    	},
		    	responsive: this.getResponsive(),
				responsiveAnimationDuration: this.getResponsiveAnimationDuration(),
				maintainAspectRatio: this.getMaintainAspectRatio(),
				events: this.getEvents(),
		    	title: titleOptions,
		    	layout: layoutOptions,
		    	legend: legendOptions,
		    	tooltips: tooltipOptions,
		    	hover: hoverOptions,
		    	animation: animationOptions,
		    	arc: arcOptions,
		    	line: lineOptions,
		    	point: pointOptions,
		    	rectangle: rectangleOptions
		    };
		    
		    if( this.getScales() ) {
		    	globalOptions.scales = this.getScales();
		    }
		    
		    this.addGlobalOptions(globalOptions);
			
			this.__ctx = document.getElementById(this.getId());
			this.__chart = new Chart(this.__ctx, {
			    type: this.getChartType(),
			    data: {
			    	labels: this.getLabels(),
			    	datasets: this.getDatasets()
			    },
			    options: globalOptions
			});
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
		
		
		/*
		* Update Chart Datasets
		* @public
		* @param {object} oDatasets - Chart Datasets
		*/
		setDatasets: function(oDatasets) {
			this.setProperty("datasets", oDatasets, true);
			this.updateChart();
		},
		
		/*
		* Update Chart Labels
		* @public
		* @param {object} oLabels - Chart Labels
		*/
		setLabels: function(oLabels) {
			this.setProperty("labels", oLabels, true);
			this.updateChart();
		},
		
		/*
		* Set the Chart Hover Mode
		* @public
		* @param {string} sHoverMode - Hover mode
		*/
		setHoverMode: function(sHoverMode) {
			this.setProperty("hoverMode", sHoverMode, true);
		},
		
		/*
		* Use this to destroy any chart instances that are created. 
		* This will clean up any references stored to the chart object within Chart.js, along with any associated event listeners attached by Chart.js. 
		* This must be called before the canvas is reused for a new chart.
		* @public
		*/
		destroyChart: function() {
			if( this.__chart ) {
				this.__chart.destroy();
			}
		},
		
		/*
		* Triggers an update of the chart. This can be safely called after replacing the entire data object. 
		* This will update all scales, legends, and then re-render the chart.
		* @public
		* @param {int} iDuration - Time for the animation of the redraw in milliseconds
		* @param {boolean} bLazy - If true, the animation can be interrupted by other animations
		*/
		updateChart: function(iDuration, bLazy) {
			if( this.__chart ) {
				this.__chart.update(iDuration, bLazy);
			}
		},
		
		/*
		* Reset the chart to it's state before the initial animation. A new animation can then be triggered using update.
		* @public
		*/
		reset: function() {
			if( this.__chart ) {
				this.__chart.reset();
			}
		},
		
		/*
		* Reset the chart to it's state before the initial animation. A new animation can then be triggered using update.
		* @public
		* @param {int} iDuration - Time for the animation of the redraw in milliseconds
		* @param {boolean} bLazy - If true, the animation can be interrupted by other animations
		*/
		render: function(iDuration, bLazy) {
			if( this.__chart ) {
				this.__chart.reset(iDuration, bLazy);
			}
		},
		
		/*
		* Use this to stop any current animation loop. This will pause the chart during any current animation frame. Call .render() to re-animate.
		* @public
		* @returns {object} Returns 'this' for chainability
		*/
		stop: function() {
			if( this.__chart ) {
				this.__chart.stop();
			}
			return this;
		},
		
		/*
		* Use this to manually resize the canvas element. 
		* This is run each time the canvas container is resized, but you can call this method manually if you change the size of the canvas nodes container element.
		* @public
		* @returns {object} Returns 'this' for chainability
		*/
		resize: function() {
			if( this.__chart ) {
				this.__chart.resize();
			}
			return this;
		},
		
		/*
		* Will clear the chart canvas. Used extensively internally between animation frames, but you might find it useful.
		* @public
		* @returns {object} Returns 'this' for chainability
		*/
		clear: function() {
			if( this.__chart ) {
				this.__chart.clear();
			}
			return this;
		},
		
		/*
		* This returns a base 64 encoded string of the chart in it's current state.
		* @public
		* @returns {object} Returns png data url of the image on the canvas
		*/
		toBase64Image: function() {
			if( this.__chart ) {
				return this.__chart.toBase64Image();
			}
			return null;
		},
		
		/*
		* Calling getElementAtEvent(event) on your Chart instance passing an argument of an event, or jQuery event, 
		* will return the single element at the event position. If there are multiple items within range, only the first is returned
		* @public
		* @param {object} oEvent - Event or jQuery Event
		* @returns {object} Returns HTML string of a legend for this chart
		*/
		getElementAtEvent: function(oEvent) {
			if( this.__chart ) {
				return this.__chart.getElementAtEvent(oEvent);
			}
			return null;
		},
		
		/*
		* Looks for the element under the event point, then returns all elements at the same data index. This is used internally for 'label' mode highlighting.
		* Calling getElementsAtEvent(event) on your Chart instance passing an argument of an event, or jQuery event, 
		* will return the point elements that are at that the same position of that event.
		* @public
		* @param {object} oEvent - Event or jQuery Event
		* @returns {object} An array of points on the canvas that are at the same position as the click event.
		*/
		getElementsAtEvent: function(oEvent) {
			if( this.__chart ) {
				return this.__chart.getElementsAtEvent(oEvent);
			}
			return null;
		},
		
		/*
		* Looks for the element under the event point, then returns all elements from that dataset. This is used internally for 'dataset' mode highlighting
		* @public
		* @param {object} oEvent - Event or jQuery Event
		* @returns {object} An array of elements
		*/
		getDatasetAtEvent: function(oEvent) {
			if( this.__chart ) {
				return this.__chart.getDatasetAtEvent(oEvent);
			}
			return null;
		},
		
		/*
		* Looks for the dataset that matches the current index and returns that metadata. This returned data has all of the metadata that is used to construct the chart.
		* @public
		* @param {int} iIndex - Index
		* @returns {object} The data property of the metadata will contain information about each point, rectangle, etc. depending on the chart type.
		*/
		getDatasetMeta: function(iIndex) {
			if( this.__chart ) {
				return this.__chart.getDatasetMeta(iIndex);
			}
			return null;
		},
		
	});


	/*
	* Override the exit method to free local resources and destroy 
	* @public
	*/	
	BaseChartJS.prototype.exit = function() {
		this.__chart.destroy();
		this.__chart = undefined;
	};
	
	return BaseChartJS;

}, /* bExport= */ true);