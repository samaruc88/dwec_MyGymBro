import {exercicis} from "./dades.js";
import {pintarCataleg,} from "./vista.js";
import {afegirExercici, eliminarExercici, obtenirSessio} from "./rutina.js";
import{pintarSessio,mostrarErrors} from "./vista.js";
import{validarFormulari} from "./formulari.js";

console.table(exercicis);
console.log("Mòdul main.js carregat correctament.");
console.log("Exercicis carregats:", exercicis);

pintarCataleg(exercicis,document.querySelector("#cataleg"));

const contenidorCataleg = document.querySelector("#cataleg");
contenidorCataleg.addEventListener("click", (event) => {
    if (event.target.classList.contains("boto-afegir")) {

        const article = event.target.closest("article");
        const idExercici = article.dataset.id;

        const missatge = afegirExercici(idExercici);
        console.log(missatge);

        pintarSessio(obtenirSessio(),document.querySelector("#llista-exercicis"));
    }
})

pintarSessio(obtenirSessio(),document.querySelector("#llista-exercicis"));

const contenidorCistella = document.querySelector("#llista-exercicis");
console.log(contenidorCistella);
contenidorCistella.addEventListener("click", (event) => {

    if (event.target.classList.contains("boto-eliminar")) {

        const ex = event.target.closest("li");
        const idExercici = ex.dataset.id;
        const missatge = eliminarExercici(idExercici);
        console.log(missatge);

        pintarSessio(obtenirSessio(idExercici),contenidorCistella);
    }
})
// Gestió de la validació en temps real i enviament del formulari d'inscripció
const form = document.querySelector("#formulari-inscripcio");
const btnConfirmar = document.querySelector("#confirmar");

/**
 * Valida els camps del formulari, pinta els errors a la vista
 * i habilita o deshabilita el botó de confirmació.
 * @returns {boolean} True si el formulari no té errors, false en cas contrari.
 */
function revisar() {
    const errors = validarFormulari(form);
    mostrarErrors(form, errors);

    const valid = Object.keys(errors).length === 0;
    btnConfirmar.disabled = !valid;
    return valid;
}

form.addEventListener("input", revisar);
form.addEventListener("change", revisar);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (revisar()) {
        // Aquí generes el resum quan tot és vàlid
        const resum = document.querySelector("#resum-rutina");
        resum.textContent="CORRECTE";
    }
});
revisar();