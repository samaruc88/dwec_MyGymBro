const CLAU = "app-mygymbro.sessio.v1";


export function guardarSessio(ids) {
    try {
        localStorage.setItem(CLAU, JSON.stringify(ids));
        return true; // <-- Millora del Codi 1
    } catch (error) {
        console.error("No s'ha pogut guardar la sessió:", error);
        return false;
    }
}

export function carregarSessio() {
    try {
        const dades = localStorage.getItem(CLAU);
        if (!dades) return [];
        const resultat = JSON.parse(dades);
        return Array.isArray(resultat) ? resultat : []; // <-- Gran encert del Codi 2
    } catch (error) {
        console.error("Error llegint la sessió guardada:", error);
        return [];
    }
}

export function eliminarSessio() {
    localStorage.removeItem(CLAU);
}