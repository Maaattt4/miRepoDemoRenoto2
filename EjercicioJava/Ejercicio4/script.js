$(document).ready(function () {
    var pasoActual, pasoSiguiente, pasoAnterior;
    var indiceActual = 1;
    var totalPasos = $("fieldset").length;

    // Inicializamos la barra al primer paso
    actualizarProgreso(indiceActual);

    $(".boton-siguiente").click(function () {
        pasoActual = $(this).parent();
        pasoSiguiente = $(this).parent().next();

        // Marcar el siguiente paso como activo
        $("#barra-pasos li").eq($("fieldset").index(pasoSiguiente)).addClass("activo");

        pasoSiguiente.show();
        pasoActual.animate({ opacity: 0 }, {
            step: function (now) {
                var opacity = 1 - now;
                pasoActual.css({ 'display': 'none', 'position': 'relative' });
                pasoSiguiente.css({ 'opacity': opacity });
            },
            duration: 500
        });

        actualizarProgreso(++indiceActual);
    });

    $(".boton-anterior").click(function () {
        pasoActual = $(this).parent();
        pasoAnterior = $(this).parent().prev();

        // Quitar activo al paso que dejamos
        $("#barra-pasos li").eq($("fieldset").index(pasoActual)).removeClass("activo");

        pasoAnterior.show();
        pasoActual.animate({ opacity: 0 }, {
            step: function (now) {
                var opacity = 1 - now;
                pasoActual.css({ 'display': 'none', 'position': 'relative' });
                pasoAnterior.css({ 'opacity': opacity });
            },
            duration: 500
        });

        actualizarProgreso(--indiceActual);
    });

    function actualizarProgreso(paso) {
        // Cálculo para que la barra se llene proporcionalmente entre los 4 círculos
        // (paso - 1) / (totalPasos - 1) nos da 0%, 33.3%, 66.6% y 100%
        var porcentaje = ((paso - 1) / (totalPasos - 1)) * 100;
        $(".barra-relleno").css("width", porcentaje + "%");
    }
});