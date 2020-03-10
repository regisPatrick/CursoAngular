angular.module("listaTelefonica").controller("detalhesContatoCtrl", function ($scope, $routeParams, contato) {

    $scope.contato = contato.data;

    // contatosAPI.getContato($routeParams.id).then(function(response){
    //     $scope.contato = response.data;
    // });
});