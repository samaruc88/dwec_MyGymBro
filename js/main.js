import {exercicis} from "./dades.js";
import {pintarCataleg} from "./vista.js";

console.table(exercicis);
console.log("Mòdul main.js carregat correctament.");
console.log("Exercicis carregats:", exercicis);

pintarCataleg(exercicis,document.querySelector("#cataleg"));