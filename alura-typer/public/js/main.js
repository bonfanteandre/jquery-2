var tempo = $("#tempo");
var tempoInicial = tempo.text();
var campoDigitacao = $(".campo-digitacao");
var contadorCaracteres = $("#contador-caracteres");
var contadorPalavras = $("#contador-palavras");

$(function(){
    atualizaTamahoFrase();
    inicializaContadores();
    inicializaMarcadores();
    inicializaCronometro();
    $("#botao-reiniciar").click(reiniciaJogo);
    atualizaPlacar();
})

function atualizaTempoInicial(tempo) {
    tempoInicial = tempo;
    $("#tempo").text(tempo);
}

function atualizaTamahoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    campoDigitacao.on("input", function() {
        var valorDigitado = campoDigitacao.val();
        var qtdCaracteres = valorDigitado.length;
        contadorCaracteres.text(qtdCaracteres);
        var qtdPalavras = valorDigitado.split(/\S+/).length - 1;
        contadorPalavras.text(qtdPalavras);
    });
}

function inicializaMarcadores(){
    campoDigitacao.on("input", function() {
        var valorDigitado = campoDigitacao.val();
        var frase = $(".frase").text().substr(0, valorDigitado.length);
        if (frase.startsWith(valorDigitado)) {
            campoDigitacao.addClass("borda-verde");
            campoDigitacao.removeClass("borda-vermelha");
        } else {
            campoDigitacao.addClass("borda-vermelha");
            campoDigitacao.removeClass("borda-verde");
        }
    });
}

function inicializaCronometro() {
    campoDigitacao.one("focus", function() {
        $("#botao-reiniciar").attr("disabled", true);
        var cronometro = setInterval(function() {
            tempo.text(tempo.text() - 1);
            if (tempo.text() < 1) {
                clearInterval(cronometro);
                finalizarJogo();
            }
        }, 1000);
    });
}

function finalizarJogo(){
    $("#botao-reiniciar").attr("disabled", false);
    campoDigitacao.attr("disabled", true);
    campoDigitacao.toggleClass("campo-desativado");
    inserePlacar();
}

function reiniciaJogo() {
    campoDigitacao.attr("disabled", false);
    campoDigitacao.val("");
    campoDigitacao.toggleClass("campo-desativado");
    campoDigitacao.removeClass("borda-verde");
    campoDigitacao.removeClass("borda-vermelha");
    contadorCaracteres.text("0");
    contadorPalavras.text("0");
    tempo.text(tempoInicial);
    inicializaCronometro();
}