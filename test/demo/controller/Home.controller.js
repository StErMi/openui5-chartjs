sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("Demo.controller.Home", {
		
		onInit  : function() {
			var lineChartData = {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
			    datasets: [
			        {
			            label: "My First dataset",
			            fill: false,
			            lineTension: 0.1,
			            backgroundColor: "rgba(75,192,192,0.4)",
			            borderColor: "rgba(75,192,192,1)",
			            borderCapStyle: 'butt',
			            borderDash: [],
			            borderDashOffset: 0.0,
			            borderJoinStyle: 'miter',
			            pointBorderColor: "rgba(75,192,192,1)",
			            pointBackgroundColor: "#fff",
			            pointBorderWidth: 1,
			            pointHoverRadius: 5,
			            pointHoverBackgroundColor: "rgba(75,192,192,1)",
			            pointHoverBorderColor: "rgba(220,220,220,1)",
			            pointHoverBorderWidth: 2,
			            pointRadius: 1,
			            pointHitRadius: 10,
			            data: [65, 59, 80, 81, 56, 55, 40],
			            spanGaps: false
			        }
			    ]
			};
			
			var barChartData = {
				labels: ["January", "February", "March", "April", "May", "June", "July"],
			    datasets: [
			        {
			            label: "My First dataset",
			            backgroundColor: [
			                'rgba(255, 99, 132, 0.2)',
			                'rgba(54, 162, 235, 0.2)',
			                'rgba(255, 206, 86, 0.2)',
			                'rgba(75, 192, 192, 0.2)',
			                'rgba(153, 102, 255, 0.2)',
			                'rgba(255, 159, 64, 0.2)'
			            ],
			            borderColor: [
			                'rgba(255,99,132,1)',
			                'rgba(54, 162, 235, 1)',
			                'rgba(255, 206, 86, 1)',
			                'rgba(75, 192, 192, 1)',
			                'rgba(153, 102, 255, 1)',
			                'rgba(255, 159, 64, 1)'
			            ],
			            borderWidth: 1,
			            data: [65, 59, 80, 81, 56, 55, 40],
			        }
			    ]
			};
			
			var radarChartData = {
				labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
			    datasets: [
			        {
			            label: "My First dataset",
			            backgroundColor: "rgba(179,181,198,0.2)",
			            borderColor: "rgba(179,181,198,1)",
			            pointBackgroundColor: "rgba(179,181,198,1)",
			            pointBorderColor: "#fff",
			            pointHoverBackgroundColor: "#fff",
			            pointHoverBorderColor: "rgba(179,181,198,1)",
			            data: [65, 59, 90, 81, 56, 55, 40]
			        },
			        {
			            label: "My Second dataset",
			            backgroundColor: "rgba(255,99,132,0.2)",
			            borderColor: "rgba(255,99,132,1)",
			            pointBackgroundColor: "rgba(255,99,132,1)",
			            pointBorderColor: "#fff",
			            pointHoverBackgroundColor: "#fff",
			            pointHoverBorderColor: "rgba(255,99,132,1)",
			            data: [28, 48, 40, 19, 96, 27, 100]
			        }
			    ]
			};
			
			var polarAreaChartData = {
				labels: [
			        "Red",
			        "Green",
			        "Yellow",
			        "Grey",
			        "Blue"
			    ],
			    datasets: [{
			        data: [
			            11,
			            16,
			            7,
			            3,
			            14
			        ],
			        backgroundColor: [
			            "#FF6384",
			            "#4BC0C0",
			            "#FFCE56",
			            "#E7E9ED",
			            "#36A2EB"
			        ],
			        label: 'My dataset' // for legend
			    }]
			};
			
			var pieChartData = {
				labels: [
			        "Red",
			        "Blue",
			        "Yellow"
			    ],
			    datasets: [{
		            data: [300, 50, 100],
		            backgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#FFCE56"
		            ],
		            hoverBackgroundColor: [
		                "#FF6384",
		                "#36A2EB",
		                "#FFCE56"
		            ]
		        }]
			};
			
			var bubbleChartData = {
			    datasets: [{
		            label: 'First Dataset',
		            data: [
		                {
		                    x: 20,
		                    y: 30,
		                    r: 15
		                },
		                {
		                    x: 40,
		                    y: 10,
		                    r: 10
		                }
		            ],
		            backgroundColor:"#FF6384",
		            hoverBackgroundColor: "#FF6384",
		        }]
			};
			
			this.getView().setModel( new JSONModel({
				lineChart: lineChartData,
				barChart: barChartData,
				radarChart: radarChartData,
				polarAreaChart: polarAreaChartData,
				pieChart: pieChartData,
				bubbleChart: bubbleChartData
			}), "temp");
			
		},
		
		/////////////////////////////////////
		// METHODS
		/////////////////////////////////////
		
		setupLineChart: function() {
			var oChart = this.getView().byId("line_chart");
			if( !oChart ) {
				return;
			}
			
			oChart.setGenerateLabelsCallback(function(chart){
				return Chart.defaults.global.legend.labels.generateLabels(chart);
			});
			oChart.setCustomTooltipCallback(function(tooltip){
				// tooltip will be false if tooltip is not visible or should be hidden
                if (!tooltip) {
                    return;
                }
			});
			oChart.setTooltipSortFunction(function(i0, i1){
				var v0 = i0.xLabel;  // or yLabel
			    var v1 = i1.xLabel;  // or yLabel
			    return (v0 < v1) ? -1 : (v0 > v1) ? 1 : 0;
			});
			oChart.setTooltipCallbacks({
				label: function(tooltipItem) {
		          var label = tooltipItem.yLabel;
		          return  'Scans : ' + label;
		        }
			});
		},
		
		/////////////////////////////////////
		// EVENTS
		/////////////////////////////////////
		
		onAnimationProgress: function(oEvent) {
			console.log("onAnimationProgress");
		},
		
		onAnimationComplete: function(oEvent) {
			console.log("onAnimationComplete");
		},
		
		onLegendItemClick: function(oEvent) {
			console.log("onLegendItemClick");
		},
		
		onLegendItemHover: function(oEvent) {
			console.log("onLegendItemHover");
		},
		
		onClick: function(oEvent) {
			console.log("onClick");
		},
		
		onHover: function(oEvent) {
			console.log("onHover");
		},
		
		onChangeDatasets: function(oEvent) {
			this.getView().getModel("temp").setProperty("/lineChart/labels/0/", "trolling?");
		},
		
		onTriggerUpdate: function(oEvent) {
			this.getView().byId("line_chart").updateChart();                       
		}

	});
});