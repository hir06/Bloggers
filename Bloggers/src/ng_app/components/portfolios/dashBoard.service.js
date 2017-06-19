(function() {
    angular.module('QuizApp.dashBoard.services', [])
        .factory('dashBoardService', dashBoardService);

    dashBoardService.$inject = ["$timeout", "$q", "$http", "appConstants"];

    function dashBoardService($timeout, $q, $http, appConstants) {

        //call service to get JSON data
        var dashBoardService = {
            fetchdashBoard: fetchdashBoard

        };

        return dashBoardService;

        function fetchdashBoard(params) {

            var def = $q.defer();

            var req = {
                method: 'GET',
                url: 'que.json'


            }
            $http(req).then(function(response) {
                def.resolve({
                    dashBoard: response.data
                });
            }, function(arg) {
                def.reject(arg.data);
            });

            return def.promise;
        }



    }
})();