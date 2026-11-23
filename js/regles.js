/**
 * Calcula els totals i agrupa les categories i grups musculars únics de la sessió.
 * @param {Array<Object>} exercicisSessio - Llista d'exercicis seleccionats a la sessió.
 * @returns {{numExercicis: number, minuts: number, calories: number, categories: Array<string>, grupMuscular: Array<string>}} Objecte amb el resum calculat.
 */
export function resumSessio(exercicisSessio){
    return{
        numExercicis: exercicisSessio.length,
        // Sumem minuts i calories recorrent tota la selecció amb reduce
        minuts: exercicisSessio.reduce((suma,ex) => suma +ex.minuts ,0),
        calories: exercicisSessio.reduce((suma,ex)=> suma +ex.calories ,0),
        // Fem servir Set per eliminar duplicats i obtindre les categories i grups diferents
        categories: [...new Set(exercicisSessio.map((ex)=> ex.categoria ))],
        grupMuscular: [...new Set(exercicisSessio.map((ex)=> ex.grupMuscular))],

    };
}
/**
 * Comprova si la sessió compleix totes les regles definides per a l'entrenament.
 * @param {Array<Object>} exercicisSessio - Llista d'exercicis seleccionats.
 * @returns {{esValida: boolean, errors: Array<string>}} Objecte amb l'estat de validesa i la llista d'avisos.
 */
export function validarSessio(exercicisSessio){
    const resum = resumSessio(exercicisSessio);
    const errors = [];
    if (resum.numExercicis < 3 || resum.numExercicis > 6) {
        errors.push("Tria entre 3 i 6 exercicis.")
    }
    if (resum.minuts < 30 || resum.minuts >75){
        errors.push("La sessió té que durar entre 30 i 75 minuts.");
    }
    if (resum.categories.length < 3) {
        errors.push("La rutina ha de tindre almenys 3 categories diferents.");
    }
    if (!resum.categories.includes("calfament")) {
        errors.push("Has d'incloure almenys un exercici de calfament.");
    }

    return { esValida: errors.length === 0, errors}

}