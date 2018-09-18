$("#botao-placar").click(mostraPlacar);
$("#botao-sync").click(sincronizaPlacar);

function mostraPlacar() {
    $(".placar").stop().slideToggle(600);
    setTimeout(function(){
        scrollPlacar();
    }, 1000);
}

function inserePlacar(){
    var jogador = "André";
    var numPalavras = $("#contador-palavras").text();
    var linha = criaLinha(jogador, numPalavras);
    linha.find("a").click(removeLinha);
    var corpoTabela = $(".placar").find("tbody");
    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    }, 1000);
}

function criaLinha(jogador, palavras){
    var linha = $("<tr>");
    var colunaJogador = $("<td>").text(jogador);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>");
    link.attr("href", "#");
    link.addClass("botao-remover");
    var icone = $("<i>");
    icone.text("delete");
    icone.addClass("small").addClass("material-icons");
    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaJogador);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);
    return linha;
}

function removeLinha(event){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut();
    setTimeout(function(){
        linha.remove();
    }, 1000);
}

function sincronizaPlacar() {
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function() {
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var registro = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(registro);
    });

    var dados = {
        placar: placar
    }

    $.post("http://localhost:3000/placar", dados, function() {
        console.log("Salvou o placar no servidor");
    });
}

function atualizaPlacar() {
    $.get("http://localhost:3000/placar", function(data) {
        $(data).each(function() {
            var linha = criaLinha(this.usuario, this.pontos);
            linha.find("a").click(removeLinha);
            $("tbody").append(linha);
        });
    });
}