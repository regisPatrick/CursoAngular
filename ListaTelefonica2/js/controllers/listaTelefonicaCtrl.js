angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function ($scope, contatos, operadoras, serialGenerator) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = contatos.data;
	$scope.operadoras = operadoras.data;

	var init = function () {
		calcularImpostos($scope.contatos);
		generateSerial($scope.contatos);
    };

    var calcularImpostos = function (contatos) {
        contatos.forEach(function (contato) {
            contato.operadora.precoComImposto = calcularImposto(contato.operadora.preco);
        });
    };

    var counter = 0;
    var calcularImposto = function (preco) {
        console.log(counter++);
        var imposto = 1.2;
        return preco * imposto;
    };

	var generateSerial = function (contatos) {
		contatos.forEach(function (item) {
			item.serial = serialGenerator.generate();
		});
	};

	$scope.adicionarContato = function (contato) {
		contato.serial = serialGenerator.generate();
		contatosAPI.saveContato(contato).success(function (data) {
			delete $scope.contato;
			$scope.contatoForm.$setPristine();
			carregarContatos();
		});
	};
	$scope.apagarContatos = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if (!contato.selecionado) return contato;
		});
	};
	$scope.isContatoSelecionado = function (contatos) {
		return contatos.some(function (contato) {
			return contato.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};
	
	init();
});