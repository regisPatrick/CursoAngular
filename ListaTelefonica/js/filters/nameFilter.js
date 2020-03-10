angular.module("listaTelefonica").filter("name", function(){
    return function(input){
        var listaDeNomes = input.split(" ");
        var listaDeNomesFormatada = listaDeNomes.map(function(nome){
            if (/(da|de|dos)/.test(nome)) return nome;
            if(/(DA|DE|DOS)/.test(nome)) return nome.toLowerCase();
            return nome.charAt(0).toUpperCase() + nome.substring(1).toLowerCase();
        });
        // console.log(listaDeNomesFormatada);
        return listaDeNomesFormatada.join(" ");
    };
});