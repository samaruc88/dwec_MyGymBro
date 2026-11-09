import {exercicis} from "./dades.js";
import {pintarCataleg} from "./vista.js";
import {afegirExercici, eliminarExercici, obtenirSessio} from "./rutina.js";
import{pintarSessio} from "./vista.js";

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
