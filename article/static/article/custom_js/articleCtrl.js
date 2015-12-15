app.controller("articleCtrl", [ '$scope', '$http', function($scope, $http) 
	{
		$scope.show_article = false;
		$scope.all_articles = '';
		$scope.total_articles = 0;
		$random_article = '';
		$scope.selected_article = '';
		$scope.random_articles = [];
		//Function to all articles from server in json format
		$scope.get_articles_list = function(){
		 	$http.get('/articles/all').success(function(data, status, headers, config)
		 	{
		 	// this callback will be called asynchronously
		 	// when the response is available
		 	//alert(data[0]["id"]);
		 	$scope.all_articles = data;
		 	$scope.total_articles = data.length;
		 	//alert($scope.total_articles);
		 	$scope.get_random_article();
			$scope.get_random_articles_list();
			}).error(function(data, status, headers, config)
			{
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				alert("System error");
			});
		};
		//Function to select 4 random articles from all articles list
		$scope.get_random_articles_list = function(){
			$scope.random_articles = [];
			//variable to keep track of the articles already added to the random articles list to avoid duplication
			var added_articles = [];
			//Function to check weather the article is already in the list
			var check_if_already_added = function(number)
			{
				for(var i=0;i<added_articles.length;i++)
					if(added_articles[i] == number)
						return true;
				return false;
			};			
			//It may happen that the same number is generaed more than once. That will cause duplication so won't be added to the list.
			//In that case we need to regenerated the number. But there should be a limit on number of timer we try. 2o is the limit here
			for(var i = 0;i < 20 && added_articles.length < 4; i++)
			{
			 	var random_number = Math.floor(Math.random() * ($scope.total_articles));
			 	//alert($scope.all_articles[random_number]);
			 	if(!check_if_already_added(random_number))
			 	{
			 		$scope.random_articles.push($scope.all_articles[random_number]);
			 		added_articles.push(random_number);
			 	}
			}
		};
		//Functio to get a random article from the server
		$scope.get_random_article = function(){
		
			var random_number = Math.floor(Math.random() * ($scope.total_articles)) + 1;
		 	$http.get('/articles/'+random_number).success(function(data, status, headers, config)
			 	{
			 		$scope.random_article = data[0];
				}).error(function(data, status, headers, config)
				{
					// called asynchronously if an error occurs
					// or server returns response with an error status.
					alert("System error");
				});
		};
		//Initializer function to call the above three functions
		$scope.init = function(){
			$scope.get_articles_list();
		};
		//Function to get an article details from server in json format
		$scope.load_article = function(article_id){
			$http.get('/articles/'+article_id+'/view').success(function(data, status, headers, config)
				 	{
				 		$scope.selected_article = data[0];
					}).error(function(data, status, headers, config)
					{
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
