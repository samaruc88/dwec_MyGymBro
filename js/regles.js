export function resumSessio(exercicisSessio){
    return{
        numExercicis: exercicisSessio.length,
        minuts: exercicisSessio.reduce((suma,ex) => suma +ex.minuts ,0),
        calories: exercicisSessio.reduce((suma,ex)=> suma +ex.calories ,0),
        categories: [...new Set(exercicisSessio.map((ex)=> ex.categoria ))],
        grupMuscular: [...new Set(exercicisSessio.map((ex)=> ex.grupMuscular))],

    };
}

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