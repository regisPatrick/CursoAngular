angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, uppercaseFilter, contatosAPI, operadoras, serialGenerator, $filter) {
    console.log(serialGenerator.generate());
    $scope.app = $filter('upper')("Lista Telefônica");
    $scope.contatos = [];
    // $scope.operadoras = [];
    $scope.operadoras = operadoras.data;
    $scope.contato = {
        data: 1034218800000
    };
    $scope.imposto = 1.2;

    // var init = function () {
    //     calcularImpostos($scope.contatos);
    // };

    // var calcularImpostos = function (contatos) {
    //     contatos.forEach(function (contato) {
    //         contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
    //     });
    // };

    // var counter = 0;
    // var calcularImposto = function (preco) {
    //     console.log(counter++);
    //     var imposto = 1.2;
    //     return preco * imposto;
    // };

    // $scope.contatos = [
    //     { nome: uppercaseFilter("Pedro"), telefone: "99998888", data: new Date(), cor: "blue", operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}},
    //     { nome: "Ana", telefone: "99998877", data: new Date(), cor: "yellow", operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}},
    //     { nome: "Maria", telefone: "99998866", data: new Date(), cor: "red", operadora: {nome: "Tim", codigo: 41, categoria: "Celular"}}
    // ];
    // $scope.operadoras = [
    //     { nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
    //     { nome: "Vivo", codigo: 15, categoria: "Celular", preco: 1},
    //     { nome: "Tim", codigo: 41, categoria: "Celular", preco: 3},
    //     { nome: "GVT", codigo: 25, categoria: "Fixo", preco: 1},
    //     { nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 2}
    // ];

    // var carregarContatos = function () {
    //     contatosAPI.getContatos().then(function (response){
    //         // console.log(response.data);
    //         $scope.contatos = response.data;
    //     });
    // };

    var carregarContatos = function(){
        contatosAPI.getContatos().then(function (response){
                // console.log(response.data);
                $scope.contatos = response.data;
                // $scope.contatos.push($scope.contatos[0]);
            }).catch(function(response, status){
                $scope.catch = "Não foi possivel carregar os dados";
            });
        };
            
        

    // var carregarOperadoras = function () {
    //     operadorasAPI.getOperadoras().then (function (response){
    //         $scope.operadoras = response.data;
    //         // console.log(response.data);
    //     });
    // };

    $scope.adicionarContato = function (contato) {
        contato.serial = serialGenerator.generate();
        contato.data = new Date();
        // $scope.contatos.push(angular.copy(contato));
        contatosAPI.saveContato(contato).then(function(response){
            delete $scope.contato;
            $scope.contatoForm.$setPristine();
            carregarContatos();
        }).catch(function(response){
            $scope.message = "Aconteceu um problema: " + response.data;
        });
        
        // $scope.contatos.push({nome: $scope.nome, telefone: $scope.telefone}); Não é a maneira correta de se fazer, evitar ao máximo ler o scope estando dentro do controller
        // console.log($scope.nome); Verifica no console se está imprimindo o nome
    };
    // $scope.classe1 = "selecionado"; forma de usar ng-class
    // $scope.classe2 = "negrito"; forma de usar ng-class
    $scope.apagarContatos = function (contatos) {
        $scope.contatos = contatos.filter(function (contato) {
            if (!contato.selecionado) return contato;
        });
        $scope.verificarContatoSelecionado($scope.contatos);
    };
    var counter = 0;
    $scope.verificarContatoSelecionado = function (contatos) {
        console.log(counter++);
        $hasContatoSelecionado = contatos.some(function (contato) {
            return contato.selecionado;
        });
    };
    $scope.ordenarPor = function (campo) {
        $scope.criterioDeOrdenacao = campo;
        $scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
    };

    $scope.reset = function () {
        $scope.contatos = angular.copy($scope.contatos);
    };

    // init();
    carregarContatos();
    // carregarOperadoras();
});