$("#botao-frase").click(fraseAleatoria);
$("#botao-frase-id").click(buscarFrase);

function fraseAleatoria() {
    $("#spinner").show();
    $.get("http://localhost:3000/frases", trocaFaseAleatoria)
    .fail(function() {
        $("#erro").show();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });
}

function trocaFaseAleatoria(data) {
    var frase = $(".frase");
    var num = Math.floor(Math.random() * data.length);
    frase.text(data[num].texto);
    atualizaTamahoFrase();
    atualizaTempoInicial(data[num].tempo);
}

function buscarFrase() {

    var idFrase = $(".frase-id").val();
    var parametros = { id: idFrase };

    $("#spinner").show();
    $.get("http://localhost:3000/frases", parametros, trocaFrase)
    .fail(function() {
        $("#erro").show();
        setTimeout(function() {
            $("#erro").toggle();
        }, 2000);
    })
    .always(function() {
        $("#spinner").toggle();
    });

}

function trocaFrase(data) {
    $(".frase").text(data.texto);
    atualizaTamahoFrase();
    atualizaTempoInicial(data.tempo);
}