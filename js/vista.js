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