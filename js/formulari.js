// envers de tindre diferents funcions per a cada item dle form, ho tenim tot en una amb el FormData-->
/**
 * Llegeix les dades del formulari amb FormData i comprova totes les regles de validació.
 * @param {HTMLFormElement} form - L'element <form> que conté les dades introduïdes.
 * @returns {Object.<string, string>} Objecte amb els errors detectats (buit si tot és vàlid).
 */
export function validarFormulari(form) {
    const dadesFormulari = new FormData(form);
    const errors = {};

    // 1. Extraiem i netegem els valors fent servir els 'name' del teu HTML
    const nom = String(dadesFormulari.get("nomRutina") ?? "").trim();
    const codi = String(dadesFormulari.get("codiRutina") ?? "").trim();
    const correu = String(dadesFormulari.get("correuRutina") ?? "").trim();
    const dies = Number(dadesFormulari.get("diesRutina"));
    const nivell = dadesFormulari.get("nivellRutina");
    const observacions = String(dadesFormulari.get("observacionsRutina") ??"").trim();

    // 2. Comprovem les regles una per una
    if (nom.length < 3 || nom.length > 40) errors.nomRutina = "Escriu un nom entre 3 i 40 caràcters.";
    if (!/^[a-zA-Z0-9\-]{3,12}$/.test(codi)) errors.codiRutina = "El codi ha de tindre entre 3 i 12 caràcters.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correu)) errors.correuRutina = "El correu electrònic és incorrecte.";
    if (!Number.isInteger(dies) || dies < 1 || dies > 7) errors.diesRutina = "Indica els dies de la setmana que vols fer la rutina.";
    if (!["principiant", "intermediari", "expert"].includes(nivell)) errors.nivellRutina = "Selecciona el teu nivell de forma física.";
    if (observacions.length>250) errors.observacionsRutina = "El màxim és 250 caràcters.";
    if (!dadesFormulari.has("acceptarCondicions")) errors.acceptarCondicions = "Cal acceptar les condicions de responsabilitat.";

    // 3. Retornem l'objecte dadesFormulari'errors (si està buit, tot és correcte)
    return errors;
}