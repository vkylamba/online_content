app.controller("articleCtrl", [ '$scope', '$cookies', '$cookieStore', '$http', function($scope, $cookies, $cookieStore, $http) 
	{
		$scope.show_article = false;
		$scope.all_articles = '';
		$scope.selected_article = '';
		$scope.get_articles_list = function(){
		 	$http.get('/articles?article_id?=all').success(function(data, status, headers, config)
		 	{
		 	// this callback will be called asynchronously
		 	// when the response is available
		 	$scope.all_articles = data;
			}).error(function(data, status, headers, config)
			{
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				alert("System error");
			});
		};
	}
]);

app.directive('chart', function() {

    return {
        restrict: 'E',
        replace: true,
        scope: {
         data: '=data',
			xParam: '=xparam',
			chartType: '=charttype'
        },
        template: '<div class="chart" id="chart_div" ></div>',
        link: function(scope, element, attrs) {

			var chart = new google.visualization.LineChart(element[0]);
			var options = {
               width: 800,
               height: 475,
               hAxis: {
                  title: scope.xParam
               },
               vAxis: {
                  title: 'Data points',
                  format: '#.#',
               },
               sortAscending: true,
        			sortColumn: 0,
            };
			var data = new google.visualization.DataTable();
         scope.$watch('data', function(v) 
			{

				//var data = google.visualization.arrayToDataTable(v);
				data = new google.visualization.DataTable();
				if(v.length > 0)
				{
					if(scope.xParam.toLowerCase() == "time")
					{	
					
						data.addColumn('string', 'Time');
						//data.addColumn('datetime', 'Time');
						//data.addColumn('string', v[0][0]);
						for(var j=1;j<v[0].length;j++)
						{
							data.addColumn('number', v[0][j]);
							//if(v[0][j] == 'voltage')
							//	dataTable.addColumn({type: 'string', role: 'tooltip'});
						}
						for(var i=1;i<v.length;i++)
						{
							
							data.addRow(v[i]);
						}
					}
					else
					{
						for(var j=1;j<v[0].length;j++)
							data.addColumn('number', v[0][j]);
						for(var i=1;i<v.length;i++)
						{
							var row = [];
							//Need to skip time now
							for(var k=1;k<v[i].length;k++)
								row[k-1] = v[i][k];
							data.addRow(row);
						}
					}
				}
				chart.draw(data, options);
				/*new google.visualization.Query('https://spreadsheets.google.com/tq?key=pCQbetd-CptHnwJEfo8tALB').
          send(queryCallback);
				chart.draw(data, options);
    				function queryCallback(response) {
      					chart.draw(response.getDataTable(),options);
    				}*/

            });
			scope.$watch('chartType', function(v) 
			{		
				if(v == "Line")
					chart = new google.visualization.LineChart(element[0]);
				else if(v == "Column")
					chart = new google.visualization.ColumnChart(element[0]);
				else if(v == "CSV")
				{

            				var str = '';

					for (var i = 0; i < scope.data.length; i++) {
						var line = '';
						for (var index in scope.data[i]) {
							if (line != '') 
								line += ','
							line += scope.data[i][index];
						}
						str += line + '\r\n';
					}
					//alert(str);
					//File.save(str, function (content) {
						var hiddenElement = document.createElement('a');

						hiddenElement.href = 'data:attachment/csv,' + encodeURI(str);
						hiddenElement.target = '_blank';
						hiddenElement.download = 'data_file.csv';
						document.body.appendChild(hiddenElement);
						hiddenElement.click();
					//});
				}
				else
					chart = new google.visualization.Table(element[0]);
				chart.draw(data, options);
			});
        }
    };
});
