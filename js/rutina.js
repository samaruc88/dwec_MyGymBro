import {exercicis} from "./dades.js";
let rutinaSeleccionada = [];

export function afegirExercici(id){
    // `.some()` és més eficient que `.find()` en aquest cas: amb `.some()` sols comprovem si l'ID existeix (true/false),
    // mentre que `.find()` carregaria tota la informació de l'exercici en memòria sense necessitat.
    let exerciciSeleccionat = exercicis.some(e=>e.id === id);

    if (!exerciciSeleccionat) return "No existix el exercici";
    if (rutinaSeleccionada.includes(id)) return "Aquest exercici ja està seleccionat"

    rutinaSeleccionada.push(id);

    return "Exercici afegit.";
}
