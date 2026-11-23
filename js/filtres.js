
/**
 * Filtra i ordena la llista d'exercicis combinant la cerca de text,
 * la categoria seleccionada i el criteri d'ordenació sense mutar l'array original.
 * @param {Array<Object>} llista - Catàleg complet d'exercicis.
 * @param {Object} opcions - Paràmetres de cerca, filtre i ordre.
 * @param {string} [opcions.text=""] - Text introduït al cercador.
 * @param {string} [opcions.categoria="tots"] - Categoria seleccionada al desplegable.
 * @param {string} [opcions.ordre="nom"] - Criteri d'ordenació ("nom", "minuts" o "calories").
 * @returns {Array<Object>} Nou array amb els exercicis filtrats i ordenats.
 */
export function filtrarIOrdenarCataleg(llista, { text = "", categoria = "tots", ordre = "nom" }) {
    const textNet = text.trim().toLowerCase();


    const filtrats = llista.filter((ex) => {
        const coincidixNom = ex.nom.toLowerCase().includes(textNet);
        const coincidixCat = categoria === "tots" || ex.categoria === categoria;
        return coincidixNom && coincidixCat;
    });

    //ordenem  sobre una còpia per no mutar l'array original
    const ordenats = [...filtrats];

    if (ordre === "nom") {
        ordenats.sort((a, b) => a.nom.localeCompare(b.nom,"ca"));
    } else if (ordre === "minuts") {
        ordenats.sort((a, b) => a.minuts - b.minuts);
    } else if (ordre === "calories") {
        ordenats.sort((a, b) => a.calories - b.calories);
    }

    return ordenats;
}