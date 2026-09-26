/* =========================================
   VARIABLES PRINCIPALES
   ========================================= */

let luz = "media";
let agua = "media";
let co2 = "medio";


/* =========================================
   CAMBIAR LUZ
   ========================================= */

function cambiarLuz(valor) {

    luz = valor;

    actualizarBotones();

    actualizarSimulador();
}


/* =========================================
   CAMBIAR AGUA
   ========================================= */

function cambiarAgua(valor) {

    agua = valor;

    actualizarBotones();

    actualizarSimulador();
}


/* =========================================
   CAMBIAR CO₂
   ========================================= */

function cambiarCO2(valor) {

    co2 = valor;

    actualizarBotones();

    actualizarSimulador();
}


/* =========================================
   ACTUALIZAR BOTONES
   ========================================= */

function actualizarBotones() {

    const botones = document.querySelectorAll(
        ".btn-control"
    );

    botones.forEach(boton => {

        boton.classList.remove("activo");

    });


    /* LUZ */

    document
        .querySelectorAll(".control-grupo")[0]
        .querySelectorAll(".btn-control")
        .forEach(boton => {

            if (
                boton.textContent
                    .toLowerCase()
                    .includes(luz)
            ) {

                boton.classList.add("activo");
            }

        });


    /* AGUA */

    document
        .querySelectorAll(".control-grupo")[1]
        .querySelectorAll(".btn-control")
        .forEach(boton => {

            if (
                boton.textContent
                    .toLowerCase()
                    .includes(agua)
            ) {

                boton.classList.add("activo");
            }

        });


    /* CO₂ */

    document
        .querySelectorAll(".control-grupo")[2]
        .querySelectorAll(".btn-control")
        .forEach(boton => {

            if (
                boton.textContent
                    .toLowerCase()
                    .includes(co2)
            ) {

                boton.classList.add("activo");
            }

        });
}


/* =========================================
   CONVERTIR NIVELES A PUNTOS
   ========================================= */

function obtenerPuntos(valor) {

    if (
        valor === "baja" ||
        valor === "bajo"
    ) {

        return 1;
    }

    if (
        valor === "media" ||
        valor === "medio"
    ) {

        return 2;
    }

    if (
        valor === "alta" ||
        valor === "alto"
    ) {

        return 3;
    }

    return 2;
}


/* =========================================
   TEXTO DEL NIVEL
   ========================================= */

function nivelTexto(valor) {

    if (
        valor === "baja" ||
        valor === "bajo"
    ) {

        return "Bajo";
    }

    if (
        valor === "media" ||
        valor === "medio"
    ) {

        return "Medio";
    }

    if (
        valor === "alta" ||
        valor === "alto"
    ) {

        return "Alto";
    }

    return "Medio";
}


/* =========================================
   ACTUALIZAR SIMULADOR
   ========================================= */

function actualizarSimulador() {

    const puntosLuz = obtenerPuntos(luz);

    const puntosAgua = obtenerPuntos(agua);

    const puntosCO2 = obtenerPuntos(co2);


    /*
       Calculamos una actividad general.

       Cada condición aporta un nivel
       de 1 a 3.
    */

    const suma =
        puntosLuz +
        puntosAgua +
        puntosCO2;


    /*
       Convertimos el resultado
       a porcentaje.
    */

    let porcentaje =
        Math.round(
            ((suma - 3) / 6) * 100
        );


    /*
       Evitamos valores menores a 0
       o mayores a 100.
    */

    porcentaje =
        Math.max(
            0,
            Math.min(
                100,
                porcentaje
            )
        );


    /* Actualizar porcentaje */

    document.getElementById(
        "porcentaje"
    ).textContent =
        porcentaje + "%";


    /* Oxígeno */

    const oxigeno =
        porcentaje;


    document.getElementById(
        "oxigenoValor"
    ).textContent =
        oxigeno + "%";


    document.getElementById(
        "oxigenoBarra"
    ).style.width =
        oxigeno + "%";


    /* Glucosa */

    const glucosa =
        Math.round(
            porcentaje * 0.95
        );


    document.getElementById(
        "glucosaValor"
    ).textContent =
        glucosa + "%";


    document.getElementById(
        "glucosaBarra"
    ).style.width =
        glucosa + "%";


    /* Estado */

    actualizarEstado(porcentaje);


    /* Factor limitante */

    detectarFactorLimitante();


    /* Apariencia de la planta */

    actualizarAnimaciones(
        porcentaje
    );


    /* Conclusión */

    actualizarConclusion(
        porcentaje
    );
}


/* =========================================
   ACTUALIZAR ESTADO
   ========================================= */

function actualizarEstado(porcentaje) {

    const estado =
        document.getElementById(
            "estado"
        );


    if (porcentaje >= 80) {

        estado.textContent =
            "🌿 Condiciones óptimas";

    }

    else if (porcentaje >= 55) {

        estado.textContent =
            "🌱 Condiciones moderadas";

    }

    else if (porcentaje >= 30) {

        estado.textContent =
            "⚠️ Condiciones poco favorables";

    }

    else {

        estado.textContent =
            "🥀 Condiciones críticas";
    }
}


/* =========================================
   FACTOR LIMITANTE
   ========================================= */

function detectarFactorLimitante() {

    const factor =
        document.getElementById(
            "factorLimitante"
        );


    const niveles = {

        luz: obtenerPuntos(luz),

        agua: obtenerPuntos(agua),

        co2: obtenerPuntos(co2)

    };


    const minimo =
        Math.min(
            niveles.luz,
            niveles.agua,
            niveles.co2
        );


    if (minimo === 3) {

        factor.textContent =
            "Ninguno";

        return;
    }


    if (niveles.luz === minimo) {

        factor.textContent =
            "☀️ Luz";

        return;
    }


    if (niveles.agua === minimo) {

        factor.textContent =
            "💧 Agua";

        return;
    }


    if (niveles.co2 === minimo) {

        factor.textContent =
            "🌫️ CO₂";
    }
}


/* =========================================
   ANIMACIÓN Y APARIENCIA DE LA PLANTA
   ========================================= */

function actualizarAnimaciones(porcentaje) {

    const planta =
        document.getElementById(
            "planta"
        );

    const sol =
        document.getElementById(
            "sol"
        );

    const apariencia =
        document.getElementById(
            "aparienciaPlanta"
        );


    /*
       Eliminamos estados anteriores.
    */

    planta.classList.remove(

        "planta-saludable",

        "poca-luz",

        "mucha-luz",

        "poca-agua",

        "mucha-agua",

        "poco-co2",

        "mucho-co2"

    );


    /* =====================================
       LUZ
       ===================================== */

    if (luz === "baja") {

        planta.classList.add(
            "poca-luz"
        );

        sol.style.opacity =
            "0.3";

        sol.style.transform =
            "scale(.85)";

    }

    else if (luz === "media") {

        sol.style.opacity =
            "0.75";

        sol.style.transform =
            "scale(1)";

    }

    else if (luz === "alta") {

        planta.classList.add(
            "mucha-luz"
        );

        sol.style.opacity =
            "1";

        sol.style.transform =
            "scale(1.1)";
    }


    /* =====================================
       AGUA
       ===================================== */

    if (agua === "baja") {

        planta.classList.add(
            "poca-agua"
        );

    }

    else if (agua === "alta") {

        planta.classList.add(
            "mucha-agua"
        );
    }


    /* =====================================
       CO₂
       ===================================== */

    if (co2 === "bajo") {

        planta.classList.add(
            "poco-co2"
        );

    }

    else if (co2 === "alto") {

        planta.classList.add(
            "mucho-co2"
        );
    }


    /* =====================================
       ESTADO GENERAL DE LA PLANTA
       ===================================== */

    if (
        luz === "media" &&
        agua === "media" &&
        co2 === "medio"
    ) {

        planta.classList.add(
            "planta-saludable"
        );

        apariencia.textContent =
            "🌿 Planta saludable";
    }


    else if (agua === "baja") {

        apariencia.textContent =
            "🥀 Planta marchita por falta de agua";
    }


    else if (
        agua === "alta"
    ) {

        apariencia.textContent =
            "💧 Planta con exceso de agua";
    }


    else if (
        luz === "baja"
    ) {

        apariencia.textContent =
            "🌥️ Planta con poca luz";
    }


    else if (
        luz === "alta"
    ) {

        apariencia.textContent =
            "☀️ Planta con mucha luz";
    }


    else if (
        co2 === "bajo"
    ) {

        apariencia.textContent =
            "🌫️ Baja disponibilidad de CO₂";
    }


    else if (
        co2 === "alto"
    ) {

        apariencia.textContent =
            "🌱 Alta disponibilidad de CO₂";
    }


    else {

        apariencia.textContent =
            "🌿 Planta en crecimiento";
    }
}


/* =========================================
   CONCLUSIÓN
   ========================================= */

function actualizarConclusion(
    porcentaje
) {

    const conclusion =
        document.getElementById(
            "conclusion"
        );


    if (porcentaje >= 80) {

        conclusion.textContent =
            "La planta cuenta con condiciones favorables de luz, agua y CO₂. Esto permite una actividad fotosintética alta y una buena producción de oxígeno y glucosa.";

    }

    else if (porcentaje >= 55) {

        conclusion.textContent =
            "La planta puede realizar la fotosíntesis, pero una de las condiciones ambientales puede estar reduciendo su actividad.";

    }

    else if (porcentaje >= 30) {

        conclusion.textContent =
            "Las condiciones ambientales no son las más favorables. La producción de oxígeno y glucosa disminuye.";

    }

    else {

        conclusion.textContent =
            "Las condiciones son poco favorables para la fotosíntesis. La planta presenta estrés y su actividad fotosintética es baja.";
    }
}


/* =========================================
   MODO EXPERIMENTO
   ========================================= */

function iniciarExperimento(tipo) {

    const resultado =
        document.getElementById(
            "resultadoExperimento"
        );


    if (tipo === "luz") {

        cambiarLuz("baja");

        resultado.innerHTML = `
            <strong>☀️ Experimento con luz</strong><br><br>

            Se redujo la cantidad de luz disponible.
            Observa cómo las hojas se vuelven más pálidas
            y disminuye la actividad fotosintética.

            <br><br>

            <strong>Observación:</strong>
            La luz es necesaria para proporcionar la energía
            que utiliza la planta durante la fotosíntesis.
        `;
    }


    if (tipo === "agua") {

        cambiarAgua("baja");

        resultado.innerHTML = `
            <strong>💧 Experimento con agua</strong><br><br>

            Se redujo la cantidad de agua disponible.

            <br><br>

            <strong>Observación:</strong>
            La planta aparece marchita y disminuye
            su actividad fotosintética.

            <br><br>

            El agua participa en el proceso de fotosíntesis
            y también ayuda a mantener la estructura de
            los tejidos de la planta.
        `;
    }


    if (tipo === "co2") {

        cambiarCO2("bajo");

        resultado.innerHTML = `
            <strong>🌫️ Experimento con CO₂</strong><br><br>

            Se redujo la disponibilidad de dióxido de carbono.

            <br><br>

            <strong>Observación:</strong>
            La actividad fotosintética disminuye porque
            el CO₂ es una de las materias primas utilizadas
            para producir glucosa.
        `;
    }
}


/* =========================================
   REINICIAR
   ========================================= */

function reiniciar() {

    luz = "media";

    agua = "media";

    co2 = "medio";


    document.getElementById(
        "resultadoExperimento"
    ).innerHTML =
        "Selecciona un experimento para comenzar.";


    actualizarBotones();

    actualizarSimulador();
}


/* =========================================
   INICIAR SIMULADOR
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        actualizarBotones();

        actualizarSimulador();

    }
);