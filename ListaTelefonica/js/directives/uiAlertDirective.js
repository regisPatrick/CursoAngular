angular.module("listaTelefonica").directive("uiAlert", function(){
    return{
        templateUrl: "view/alert.html",
        replace: true,
        restrict: "AE",
        scope: {
            title: "@",
            // message: "=" --> com o transclude eu nao terei mais o message nesse lugar
        },
        transclude: true
    };
});