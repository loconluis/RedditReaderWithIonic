(function(){
    var app = angular.module('starter', ['ionic', 'angularMoment'])


    app.controller('RedditCtrl', function($scope, $http){
        $scope.posts = [];
                $http.get('https://www.reddit.com/r/leagueoflegends/new/.json')
                .success(function(posts){
                    angular.forEach(posts.data.children, function(child){
                        $scope.posts.push(child.data);
                    });
                });
        
        //funcion de cargar mas publicaciones a la lista
        $scope.loadMoreData = function(){
            //Variable parametro
            var paramsaux = {};
            
            //Verifica si tiene contenidos el hijo(child) anterior
            if($scope.posts.length > 0){
                paramsaux['after'] = $scope.posts[$scope.posts.length - 1].name;
            }
            
            $http.get('https://www.reddit.com/r/leagueoflegends/new/.json', {params: paramsaux})
                .success(function(posts){
                    angular.forEach(posts.data.children, function(child){
                        $scope.posts.push(child.data);
                    });
                    //Quita el scroll cuando termina de cargar
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
        };
        
        $scope.refreshData = function(){

            //Verifica si tiene contenidos el hijo(child) anterior
            if($scope.posts.length > 0){
                var paramsaux = {'before':$scope.posts[0].name};
            }else{
                
                return;
            }
            
            $http.get('https://www.reddit.com/r/leagueoflegends/new/.json', {params: paramsaux})
                .success(function(posts){
                    var newChild = [];
                    angular.forEach(posts.data.children, function(child){
                        newChild.push(child.data);
                    });
                    $scope.posts = newChild.concat($scope.posts);
                    //Quita el scroll cuando termina de cargar
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };
        
        $scope.openLink = function(url){
            window.open(url, '_blank');
            
        };
        
    });
            
    app.run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
   
            if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if(window.cordova && window.cordova.InAppBrowser){
                window.open = window.cordova.InAppBrowser.open;
            }
            
            if(window.StatusBar) {
            StatusBar.styleDefault();
            }
        });
    })
}());

