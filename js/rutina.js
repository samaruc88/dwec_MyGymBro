import {exercicis} from "./dades.js";
let cistellaExercicis = [];

export function afegirExercici(id){
    // `.some()` és més eficient que `.find()` en aquest cas: amb `.some()` sols comprovem si l'ID existeix (true/false),
    // mentre que `.find()` carregaria tota la informació de l'exercici en memòria sense necessitat.
    let exerciciSeleccionat = exercicis.some(e=>e.id === id);

    if (!exerciciSeleccionat) return "No existix el exercici";
    if (cistellaExercicis.includes(id)) return "Aquest exercici ja està seleccionat"

    cistellaExercicis.push(id);

    return "Exercici afegit.";
}
//Retorna els detalls complets dels exercicis que formen part de la rutina seleccionada, buscant-los pel seu ID.
export const obtenirSessio = () =>
    cistellaExercicis.map((id) => exercicis.find((ex) => ex.id === id));