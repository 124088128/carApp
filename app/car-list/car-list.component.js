'use strict';
//Register carList component, along with its associated controller and template
angular.
	module('carList').
	component('carList',{
		templateUrl:'car-list/car-list.template.html',
		controller: function ($scope,$http){
			
			//request the data from the giving url
			$http({
    			method : "GET",
    			url : " https://mobiledev.sunovacu.ca/api/Values/GetCars"
  			}).then(function mySucces(response) {
     			//stroe all the data got into the 'cars'
     			$scope.cars = response.data;
   			}, function myError(response) {
     			$scope.cars = response.statusText;
  				});
  			
			 //parse each mileage in the data into integer
			angular.forEach($scope.cars,function(car){
				car.mileage = parseFloat(car.mileage);
			});

			$scope.sortColumn ='mileage';

			$scope.sortDescending = false; //means sort with ascending order
			$scope.sorted = false;//if the table is sorted
			
			// the function work with the click on the column header
			$scope.sortData = function(column){
				
				$scope.sortDescending = ($scope.sortColumn == column) ? !$scope.sortDescending : false;
				$scope.sorted = true;
				$scope.sortColumn = column;
			};

			//function to display whether the arrow-down of the arrow-up, indicate whether the 
			//table is in Ascending order of the descending order
			$scope.getSortClass = function(column){
				if($scope.sortColumn == column&&$scope.sorted){
					// return $scope.sortDescending ? 'arrow-down' : 'arrow-up';
					if($scope.sortDescending){
						return 'arrow-down';
					}else{
						return 'arrow-up';
					}
			
				}
				return '';
			};

			$scope.getSortOrder = function(){
				if($scope.sortDescending){
					return 'Descending Order';
				}else{
					return ''
				}

				
			};



	
		}
	});		
		
// angular.module('carList').
// 	controller('CarListController',function(){
// 		console.log("hello")
// 	})