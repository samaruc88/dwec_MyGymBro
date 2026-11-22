import { resumSessio } from "./regles.js";
/**
 * Pinta el catàleg d'exercicis al DOM de manera dinàmica.
 * @param {Array} llista - L'array d'objectes amb els exercicis a mostrar.
 * @param {HTMLElement} contenidor - L'element del DOM on s'injectaran les targetes.
 */
export function pintarCataleg(llista,contenidor){
    contenidor.replaceChildren();

    if (llista.length === 0) {
        const missatge = document.createElement("p");
        missatge.textContent = "No hi ha exercicis amb estos filtres.";
        contenidor.append(missatge);
        return;
    }

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

        //const descripcio=document.createElement("p");
        //descripcio.textContent=exercici.descripcio;

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

        article.append(titol,categoria,imatge,resum,botoDetall,botoAfegir);
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

    llista.forEach((exercici,index)=>{
        const liniaExercici=document.createElement("li");
        liniaExercici.dataset.id = exercici.id
        liniaExercici.draggable = true;

        const nomExercici= document.createElement("span");
        nomExercici.textContent=exercici.nom;
        const resum=document.createElement("small");
        resum.textContent=`${exercici.minuts} · ${exercici.calories} · ${exercici.grupMuscular}`;

        const botoBaixar = document.createElement("button");
        botoBaixar.type = "button";
        botoBaixar.className = "boto-baixar";
        botoBaixar.textContent = "↓";
        botoBaixar.ariaLabel = `Baixar ${exercici.nom}`;
        botoBaixar.disabled = index === llista.length - 1;

        // Botó Pujar
        const botoPujar = document.createElement("button");
        botoPujar.type = "button";
        botoPujar.className = "boto-pujar";
        botoPujar.textContent = "↑";
        botoPujar.ariaLabel = `Pujar ${exercici.nom}`;
        botoPujar.disabled = index === 0; // No es pot pujar si ja és el primer

        const botoEliminar = document.createElement("button");
        botoEliminar.type = "button";
        botoEliminar.className = "boto-eliminar";
        botoEliminar.textContent = "❌";
        botoEliminar.ariaLabel = `Eliminar ${exercici.nom}`;

        liniaExercici.append(nomExercici,botoBaixar,botoPujar,botoEliminar,resum);

        contenidor.append(liniaExercici);
    })
}
export function pintarErrorsSessio(errors){
    const contenidorsErrorSessio= document.querySelectorAll(".errors-sessio");

    contenidorsErrorSessio.forEach((contenidor) => {
        if (contenidor.tagName === "UL") {
            const llistaElements = errors.map((error) => {
                const li = document.createElement("li");
                li.textContent = error;
                return li;
            });
            contenidor.replaceChildren(...llistaElements);
        } else {
            contenidor.textContent = errors.join(" · ");
        }
    });
}

/**
 * Mostra els missatges d'error als seus spans corresponents i actualitza
 * l'atribut d'accessibilitat aria-invalid de cada camp del formulari.
 * @param {HTMLFormElement} form - L'element <form> del DOM que es vol actualitzar.
 * @param {Object.<string, string>} errors - Objecte amb els noms dels camps i els seus missatges d'error.
 */
export function pintarErrorsForm(form, errors) {
    form.querySelectorAll("[name]").forEach((camp) => {
        const nom = camp.name;
        const span = document.querySelector(`#error-${nom}`);
        if (span) span.textContent = errors[nom] ?? "";
        camp.setAttribute("aria-invalid", String(Boolean(errors[nom])));
    });
}

export function pintarResum(dadesFormulari, exercicisSessio, contenidor){
    contenidor.replaceChildren();
    const totals = resumSessio(exercicisSessio);
    const titol=document.createElement("h3");
    titol.textContent="INSCRIPCIÓ RUTINA CONFIRMADA";
    const dadesForm=document.createElement("p");
    dadesForm.textContent=`${dadesFormulari.nomRutina} - ${dadesFormulari.codiRutina}`;
    const infoUsuari = document.createElement("p");
    infoUsuari.textContent = `Correu: ${dadesFormulari.correuRutina} · Dies a la setmana: ${dadesFormulari.diesRutina} · Nivell: ${dadesFormulari.nivellRutina}`;
    const ex = document.createElement("p");
    ex.textContent = "Exercicis: " + exercicisSessio.map((exercici) => exercici.nom).join(", ");
    const infoTotals = document.createElement("p");
    infoTotals.textContent = `Total: ${totals.numExercicis} exercicis · ${totals.minuts} minuts · ${totals.calories} calories`;

    let pObs = null;
    if (dadesFormulari.observacionsRutina) {
        pObs = document.createElement("p");
        pObs.textContent = `Observacions: ${dadesFormulari.observacionsRutina}`;
    }
    const avis = document.createElement("p");
    avis.textContent = "No s’ha enviat cap dada. Aquesta planificació és una simulació d'entrenament.";

    contenidor.append(...[titol,dadesForm,infoUsuari,ex,infoTotals,pObs,avis].filter(Boolean));
}
export function pintarTotalsSessio(totals) {
    document.querySelector("#total-exercicis").textContent = totals.numExercicis;
    document.querySelector("#total-minuts").textContent = totals.minuts;
    document.querySelector("#total-calories").textContent = totals.calories;
}

export function pintarDetallExercici(exercici) {
    const finestraDetall = document.getElementById("detall");

    document.getElementById("detall-imatge").src = exercici.imatge;
    document.getElementById("detall-imatge").alt = exercici.altText || exercici.nom;
    document.getElementById("detall-titol").textContent = exercici.nom;
    document.getElementById("detall-text").textContent = exercici.descripcio;
    document.getElementById("detall-dades").textContent = `${exercici.categoria} · ${exercici.grupMuscular} · ${exercici.minuts} min · ${exercici.calories} kcal`;

    // Guardem l'ID al botó d'afegir del modal per saber quin exercici és si l'usuari el prem
    document.getElementById("detall-afegir").dataset.id = exercici.id;

    finestraDetall.showModal();
}