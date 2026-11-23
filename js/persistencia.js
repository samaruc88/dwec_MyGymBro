const CLAU = "app-mygymbro.sessio.v1";

/**
* Desa l'array d'identificadors de la sessió al localStorage en format JSON.
* @param {Array<string>} ids - Llista d'IDs dels exercicis seleccionats.
* @returns {boolean} True si s'ha guardat correctament, false en cas d'error.
*/
export function guardarSessio(ids) {
    try {
        localStorage.setItem(CLAU, JSON.stringify(ids));
        return true;
    } catch (error) {
        console.error("No s'ha pogut guardar la sessió:", error);
        return false;
    }
}
/**
 * Recupera la llista d'IDs guardada al localStorage de manera segura.
 * @returns {Array<string>} Array d'identificadors o un array buit si no n'hi ha o hi ha error.
 */
export function carregarSessio() {
    try {
        const dades = localStorage.getItem(CLAU);
        if (!dades) return [];
        const resultat = JSON.parse(dades);
        // Verifiquem que la dada recuperada siga realment un array abans de tornar-la
        return Array.isArray(resultat) ? resultat : [];
    } catch (error) {
        console.error("Error llegint la sessió guardada:", error);
        return [];
    }
}
/**
 * Esborra completament les dades de la sessió del localStorage.
 */
export function eliminarSessio() {
    localStorage.removeItem(CLAU);
}
/**
 * Crea o actualitza la cookie que recorda la preferència del mode de pantalla .
 * @param {string} tema - Valor del tema ("fosc" o "clar").
 */
export function guardarCookie(tema) {
    // Creem la cookie amb durada de 7 dies (604800 segons)
    document.cookie = `tema_mygymbro=${tema}; max-age=604800; path=/`;
}
/**
 * Llig la cookie de preferència del mode de pantalla
 * @returns {string|null} El tema guardat ("fosc" o "clar") o null si no existeix.
 */
export function llegirCookie() {
    const cookies = document.cookie.split("; ");
    const trobada = cookies.find((c) => c.startsWith("tema_mygymbro="));
    return trobada ? trobada.split("=")[1] : null;
}
/**
 * Elimina la cookie delñ mode de pantalla establint la seua caducitat a zero.
 */
export function eliminarCookie() {
    // Posem max-age=0 perquè el navegador l'esborre a l'instant
    document.cookie = "tema_mygymbro=; max-age=0; path=/";
}