/**
 * Pinta el catàleg d'exercicis al DOM de manera dinàmica.
 * @param {Array} llista - L'array d'objectes amb els exercicis a mostrar.
 * @param {HTMLElement} contenidor - L'element del DOM on s'injectaran les targetes.
 */
export function pintarCataleg(llista,contenidor){
    contenidor.replaceChildren();

    for(const exercici of llista){

        const article =document.createElement("article");
        article.dataset.id = exercici.id;

        const titol=document.createElement("h2");
        titol.textContent=exercici.nom;

        const categoria=document.createElement("h3");
        categoria.textContent=exercici.categoria;

        const imatge = document.createElement("img");
        imatge.src=exercici.imatge;
        imatge.alt=exercici.altText;

        const resum=document.createElement("p");
        resum.textContent= `${exercici.minuts} minuts - ${exercici.calories} calories - ${exercici.grupMuscular}`;

        const descripcio=document.createElement("p");
        descripcio.textContent=exercici.descripcio;

        const botoDetall=document.createElement("button");
        botoDetall.type="button";
        botoDetall.className = "boto-detall";
        botoDetall.ariaLabel = `Detalls de l'exercici ${exercici.nom}`;
        botoDetall.textContent = "Detall";

        const botoAfegir=document.createElement("button");
        botoAfegir.type="button";
        botoAfegir.className = "boto-afegir";
        botoAfegir.ariaLabel = `Afegir l'exercici ${exercici.nom} a la rutina`;
        botoAfegir.textContent = "Afegir";

        article.append(titol,categoria,imatge,resum,descripcio,botoDetall,botoAfegir);
        contenidor.append(article);
    }
}
export function pintarSessio(llista,contenidor){
    contenidor.replaceChildren();
    if (llista.length === 0 ){

        const missatge=document.createElement("p");
        missatge.textContent="Encara no has seleccionat cap exercici";

        contenidor.append(missatge);
        return;
    }

    llista.forEach((exercici,i)=>{
        const liniaExercici=document.createElement("li");
        liniaExercici.dataset.id = exercici.id
        const nomExercici= document.createElement("span");
        nomExercici.textContent=exercici.nom;
        const resum=document.createElement("small");
        resum.textContent=`${exercici.minuts} · ${exercici.calories} · ${exercici.grupMuscular}`;
        const botoEliminar = document.createElement("button");
        botoEliminar.type = "button";
        botoEliminar.className = "boto-eliminar";
        botoEliminar.textContent = "❌";
        botoEliminar.ariaLabel = `Eliminar ${exercici.nom}`;

        liniaExercici.append(nomExercici,botoEliminar,resum);

        contenidor.append(liniaExercici);
    })
}

/**
 * Mostra els missatges d'error als seus spans corresponents i actualitza
 * l'atribut d'accessibilitat aria-invalid de cada camp del formulari.
 * @param {HTMLFormElement} form - L'element <form> del DOM que es vol actualitzar.
 * @param {Object.<string, string>} errors - Objecte amb els noms dels camps i els seus missatges d'error.
 */
export function mostrarErrors(form, errors) {
    form.querySelectorAll("[name]").forEach((camp) => {
        const nom = camp.name;
        const span = document.querySelector(`#error-${nom}`);
        if (span) span.textContent = errors[nom] ?? "";
        camp.setAttribute("aria-invalid", String(Boolean(errors[nom])));
    });
}