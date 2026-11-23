import {exercicis} from "./dades.js";
import{guardarSessio,carregarSessio,eliminarSessio} from "./persistencia.js";

let cistellaExercicis = carregarSessio().filter((id) =>
    exercicis.some((e) => e.id === id)
);

export function afegirExercici(id){
    // `.some()` és més eficient que `.find()` en aquest cas: amb `.some()` sols comprovem si l'ID existeix (true/false),
    // mentre que `.find()` carregaria tota la informació de l'exercici en memòria sense necessitat.
    let exerciciSeleccionat = exercicis.some(e=>e.id === id);

    if (!exerciciSeleccionat) return "No existix el exercici";
    if (cistellaExercicis.includes(id)) return "Aquest exercici ja està seleccionat"

    cistellaExercicis.push(id);
    guardarSessio(cistellaExercicis);
    return "Exercici afegit.";
}
//Retorna els detalls complets dels exercicis que formen part de la rutina seleccionada, buscant-los pel seu ID.
export const obtenirSessio = () =>
    cistellaExercicis.map((id) => exercicis.find((ex) => ex.id === id));


export function eliminarExercici(id){
    const ex = cistellaExercicis.indexOf(id);
    if ( ex !== -1) {
        cistellaExercicis.splice(ex, 1);
        guardarSessio(cistellaExercicis);
    }
    return "Exercici eliminat";
}
export function moureExercici(id, desp) {
    const i = cistellaExercicis.indexOf(id);
    const j = i + desp;

    if (i < 0 || j < 0 || j >= cistellaExercicis.length) return;

    cistellaExercicis.splice(i, 1);
    cistellaExercicis.splice(j, 0, id);
    guardarSessio(cistellaExercicis);
}
export function reordenarExercici(idOrigen, idDesti) {
    const indexOrigen = cistellaExercicis.indexOf(idOrigen);
    const indexDesti = cistellaExercicis.indexOf(idDesti);

    if (indexOrigen === -1 || indexDesti === -1 || indexOrigen === indexDesti) return;

    const [mogut] = cistellaExercicis.splice(indexOrigen, 1);
    cistellaExercicis.splice(indexDesti, 0, mogut);
    guardarSessio(cistellaExercicis);
}
export function buidarSessio() {
    cistellaExercicis = [];
    eliminarSessio();
}