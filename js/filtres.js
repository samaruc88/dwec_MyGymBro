
export function filtrarIOrdenarCataleg(llista, { text = "", categoria = "tots", ordre = "nom" }) {
    const textNet = text.trim().toLowerCase();

    // 1. Filtren nom + categoria
    const filtrats = llista.filter((ex) => {
        const coincidixNom = ex.nom.toLowerCase().includes(textNet);
        const coincidixCat = categoria === "tots" || ex.categoria === categoria;
        return coincidixNom && coincidixCat;
    });

    // 2. Apliquem l'ordenació sobre una còpia per no mutar l'array original
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