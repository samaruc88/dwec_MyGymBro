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

export function guardarCookie(tema) {
    // Creem la cookie amb durada de 7 dies (604800 segons)
    document.cookie = `tema_mygymbro=${tema}; max-age=604800; path=/`;
}

export function llegirCookie() {
    const cookies = document.cookie.split("; ");
    const trobada = cookies.find((c) => c.startsWith("tema_mygymbro="));
    return trobada ? trobada.split("=")[1] : null;
}

export function eliminarCookie() {
    // Posem max-age=0 perquè el navegador l'esborre a l'instant
    document.cookie = "tema_mygymbro=; max-age=0; path=/";
}