import {exercicis} from "./dades.js";
import{guardarSessio,carregarSessio,eliminarSessio} from "./persistencia.js";

let cistellaExercicis = carregarSessio().filter((id) =>
    exercicis.some((e) => e.id === id)
);

/**
 * Afig un exercici a la sessió actual si existeix al catàleg i no està duplicat.
 * @param {string} id - Identificador únic de l'exercici.
 * @returns {string} Missatge informatiu sobre el resultat de l'operació.
 */
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
/**
 * Retorna la llista completa amb totes les dades dels exercicis seleccionats.
 * @returns {Array<Object>} Array d'objectes exercici ordenats segons la sessió.
 */
export const obtenirSessio = () =>
    cistellaExercicis.map((id) => exercicis.find((ex) => ex.id === id));

/**
* Elimina un exercici de la sessió pel seu identificador i actualitza el localStorage.
* @param {string} id - Identificador de l'exercici a esborrar.
* @returns {string} Missatge de confirmació.
*/
export function eliminarExercici(id){
    const ex = cistellaExercicis.indexOf(id);
    if ( ex !== -1) {
        cistellaExercicis.splice(ex, 1);
        guardarSessio(cistellaExercicis);
    }
    return "Exercici eliminat";
}
/**
 * Desplaça un exercici una posició cap amunt (-1) o cap avall (+1).
 * @param {string} id - Identificador de l'exercici a moure.
 * @param {number} desp - Desplaçament relatiu (-1 per pujar, 1 per baixar).
 */
export function moureExercici(id, desp) {
    const i = cistellaExercicis.indexOf(id);
    const j = i + desp;

    if (i < 0 || j < 0 || j >= cistellaExercicis.length) return;

    cistellaExercicis.splice(i, 1);
    cistellaExercicis.splice(j, 0, id);
    guardarSessio(cistellaExercicis);
}
/**
 * Reordena la sessió movent un exercici arrossegat fins a la posició de destí (Drag & Drop).
 * @param {string} idOrigen - Identificador de la fila arrossegada.
 * @param {string} idDesti - Identificador de la fila on s'amolla.
 */
export function reordenarExercici(idOrigen, idDesti) {
    const indexOrigen = cistellaExercicis.indexOf(idOrigen);
    const indexDesti = cistellaExercicis.indexOf(idDesti);

    if (indexOrigen === -1 || indexDesti === -1 || indexOrigen === indexDesti) return;

    const [mogut] = cistellaExercicis.splice(indexOrigen, 1);
    cistellaExercicis.splice(indexDesti, 0, mogut);
    guardarSessio(cistellaExercicis);
}
/**
 * Buida completament la sessió actual tant en memòria com al localStorage.
 */
export function buidarSessio() {
    cistellaExercicis = [];
    eliminarSessio();
}