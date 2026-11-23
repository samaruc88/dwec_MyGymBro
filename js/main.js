import {exercicis} from "./dades.js";
import {pintarCataleg,pintarSessio,pintarErrorsForm,pintarErrorsSessio,pintarResum,pintarTotalsSessio,pintarDetallExercici} from "./vista.js";
import {afegirExercici, eliminarExercici, obtenirSessio,moureExercici,reordenarExercici,buidarSessio} from "./rutina.js";
import {validarFormulari} from "./formulari.js";
import {resumSessio, validarSessio} from "./regles.js";
import {filtrarIOrdenarCataleg} from "./filtres.js";
import {guardarCookie,llegirCookie,eliminarCookie} from "./persistencia.js";

//console.table(exercicis);
//console.log("Exercicis carregats:", exercicis);


const contenidorCataleg = document.querySelector("#cataleg");
const inputCerca = document.querySelector("#cerca-text");
const selectCategoria = document.querySelector("#filtre-categoria");
const selectOrdre = document.querySelector("#ordenar-cataleg");

const finestraDetall = document.getElementById("detall");
const contenidorCistella = document.querySelector("#llista-exercicis");

const btBuidar = document.querySelector("#bt-buidar-sessio");
const form = document.querySelector("#formulari-inscripcio");
const btnConfirmar = document.querySelector("#confirmar");

const botoTema = document.getElementById("boto-tema");
const botoRestablirTema = document.getElementById("restablir-tema");

/**
 * Filtra i ordena el catàleg segons els controls actuals i el torna a pintar.
 */
function actualitzarCataleg() {
    const exercicisFiltrats = filtrarIOrdenarCataleg(exercicis, {
        text: inputCerca.value,
        categoria: selectCategoria.value,
        ordre: selectOrdre.value
    });
    pintarCataleg(exercicisFiltrats, contenidorCataleg);
}
/**
 * Actualitza la llista de la sessió a l'aside, els comptadors totals,
 * l'estat del botó de buidar i revalida les regles.
 */
function actualitzarSessio() {
    const sessioActual = obtenirSessio();
    const btBuidar = document.querySelector("#bt-buidar-sessio");
    if (btBuidar) {
        btBuidar.disabled = sessioActual.length === 0;
    }
    pintarSessio(sessioActual, document.querySelector("#llista-exercicis"));
    pintarTotalsSessio(resumSessio(sessioActual));
    revisar();
}
/**
 * Valida els camps del formulari, pinta els errors a la vista
 * i habilita o deshabilita el botó de confirmació.
 * @returns {boolean} True si el formulari no té errors, false en cas contrari.
 */
function revisar() {
    // 1. Validem el formulari
    const errorsForm = validarFormulari(form);
    pintarErrorsForm(form, errorsForm);
    const formValid = Object.keys(errorsForm).length === 0;

    // 2. Validem les regles de la sessió d'exercicis
    const resultatSessio = validarSessio(obtenirSessio());
    pintarErrorsSessio(resultatSessio.errors);

    // 3. El botó només s'habilita si TOTS DOS són vàlids
    const totValid = formValid && resultatSessio.esValida;
    btnConfirmar.disabled = !totValid;

    // 4. Si s'ha modificat alguna dada després de confirmar, invalidem el resum anterior
    document.querySelector("#resum-rutina").replaceChildren();

    return {totValid, resultatSessio};

}


inputCerca.addEventListener("input", actualitzarCataleg);
selectCategoria.addEventListener("change", actualitzarCataleg);
selectOrdre.addEventListener("change", actualitzarCataleg);

contenidorCataleg.addEventListener("click", (event) => {
    if (event.target.classList.contains("boto-afegir")) {

        const article = event.target.closest("article");
        const idExercici = article.dataset.id;

        const missatge = afegirExercici(idExercici);
        console.log(missatge);

        actualitzarSessio();
    }
    if (event.target.classList.contains("boto-detall")) {
        const article = event.target.closest("article");
        const idExercici = article.dataset.id;
        const exerciciTrobat = exercicis.find((ex) => ex.id === idExercici);

        if (exerciciTrobat) {
            pintarDetallExercici(exerciciTrobat);
        }
    }
})


// 1. Tancar amb la creu
document.getElementById("tancar-detall").addEventListener("click", () => {
    finestraDetall.close();
});

// 2. Afegir a la rutina directament des del modal
document.getElementById("detall-afegir").addEventListener("click", (event) => {
    const idExercici = event.target.dataset.id;

    afegirExercici(idExercici);
    actualitzarSessio();

    finestraDetall.close(); // Tanquem el modal un cop afegit
});



//console.log(contenidorCistella);
contenidorCistella.addEventListener("click", (event) => {
    const ex = event.target.closest("li");
    const idExercici = ex.dataset.id;
    if (event.target.classList.contains("boto-eliminar")) {

        const missatge = eliminarExercici(idExercici);
        console.log(missatge);

        actualitzarSessio();
    }else if (event.target.classList.contains("boto-pujar")) {
        moureExercici(idExercici, - 1);
        actualitzarSessio();
    } else if (event.target.classList.contains("boto-baixar")) {
        moureExercici(idExercici, + 1);
        actualitzarSessio();
    }
});
contenidorCistella.addEventListener("dragstart", (event) => {
    const li = event.target.closest("li");
    if (!li) return;
    event.dataTransfer.setData("text/plain", li.dataset.id);
    li.classList.add("arrossegant");
});

contenidorCistella.addEventListener("dragover", (event) => {
    event.preventDefault();
});

contenidorCistella.addEventListener("drop", (event) => {
    event.preventDefault();
    const liDesti = event.target.closest("li");
    if (!liDesti) return;

    const idOrigen = event.dataTransfer.getData("text/plain");
    const idDesti = liDesti.dataset.id;
    console.log("DROPPED:", idOrigen, "->", idDesti);
    reordenarExercici(idOrigen, idDesti);
    actualitzarSessio();
});

contenidorCistella.addEventListener("dragend", (event) => {
    const li = event.target.closest("li");
    if (li) li.classList.remove("arrossegant");
});

if (btBuidar) {
    btBuidar.addEventListener("click", () => {
        buidarSessio();
        actualitzarSessio();
    });
}

if (llegirCookie() === "fosc") {
    document.body.classList.add("tema-fosc");
    botoTema.textContent = "Canviar a mode clar";
}
botoTema.addEventListener("click", () => {
    const esFosc = document.body.classList.toggle("tema-fosc");

    if (esFosc) {
        guardarCookie("fosc");
        botoTema.textContent = "mode clar";
    } else {
        guardarCookie("clar");
        botoTema.textContent = "mode fosc";
    }
});
botoRestablirTema.addEventListener("click", () => {
    document.body.classList.remove("tema-fosc");
    eliminarCookie();
    botoTema.textContent = "mode fosc";
});

form.addEventListener("input", revisar);
form.addEventListener("change", revisar);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const { totValid, resultatSessio } = revisar();
    if (totValid) {
        const dadesFormulari = Object.fromEntries(new FormData(form));
        pintarResum(dadesFormulari, obtenirSessio(), document.querySelector("#resum-rutina"));



    }
});
actualitzarCataleg();
actualitzarSessio();
