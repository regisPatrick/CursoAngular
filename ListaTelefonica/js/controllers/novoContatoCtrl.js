angular.module("listaTelefonica").controller("novoContatoCtrl", function ($scope, uppercaseFilter, contatosAPI, operadoras, serialGenerator, $location) {
    $scope.operadoras = operadoras.data;


    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        // $scope.contatos.push(angular.copy(contato));
        contatosAPI.saveContato(contato).then(function(response){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            $location.path("/contatos");
        }).catch(function(response){
            $scope.message = "Aconteceu um problema: " + response.data;
        });
    };
});