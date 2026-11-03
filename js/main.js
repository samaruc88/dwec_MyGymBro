import {exercicis} from "./dades.js";
import {pintarCataleg} from "./vista.js";
import {afegirExercici} from "./rutina.js";

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
    }
})