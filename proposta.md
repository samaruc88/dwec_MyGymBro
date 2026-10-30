# Proposta de Projecte: MyGymBro

## 1. Nom de l'aplicació, públic i problema que resol
- **Nom:** MyGymBro
- **Públic:** Persones persones que volen planificar les seues sessions d'entrenament de manera ràpida i visual.
- **Problema que resol:** Facilita la creació i organització de rutines d'entrenament personalitzades seleccionant directament els exercicis d'un catàleg interactiu, controlant al moment la durada, les categories i el compliment de regles d'entrenament.

## 2. Què representa un element del catàleg i què representa la selecció
- **Element del catàleg:** Un exercici individual de gimnàs (per exemple, *Press de banca*, *Sentadilles*, etc.) amb la seva descripció, categoria i magnituds.
- **La selecció:** La rutina o sessió d'entrenament completa que l'usuari està construint afegint i ordenant els exercicis triats.

## 3. Camps de les dades, categories i magnitud numèrica que calculara.
- **Camps de cada element:** Identificador únic, nom, categoria, descripció, imatge, text alternatiu, minuts, calories i grup muscular principal.
- **Categories:**
    - `calfament`,`cardio`,`tronc superior`,`tronc inferior`,`flexibilitat`,`core`.
- **Magnitud numèrica principal:** Els **minuts** (per calcular la durada total de la sessió) i les **calories** estimades.

## 4. Tres regles de validació de la selecció, amb limits exactes.
1. **Nombre d'exercicis:** Mínim 3 i màxim 8 exercicis a la selecció.
2. **Límit numèric total:** La durada total de la sessió ha d'estar compresa entre **30 minuts i 75 minuts**.
3. **Regla de composició:** La sessió ha d'incloure obligatòriament almenys un element de la categoria de `calfament` i abastar un total de **3 categories diferents** com a mínim.

## 5. Camps del formulari, classe especialitzada i funcionalitat addicional
- **Camps del formulari de confirmació:**
    - Nom de la proposta (entre 3 i 40 caràcters).
    - Correu de contacte fictici (obligatori i format vàlid).
    - Camp numèric (dies per setmana de la sessió: enter entre 1 i 7).
    - Selector (`select` o ràdio) de nivell de condició física (Principiant, Intermedi, Avançat).
    - Casella de confirmació obligatòria amb la informació de responsabilitat propia.
    - Codi curt de la proposta (3–12 caràcters, només lletres ASCII, dígits i guió).
- **Classes (POO):** Classe base `Sessio` i subclasse `SessioIntensiva` (que aplica un càlcul modificat o bonus addicional de calories/intensitat).
- **Funcionalitat addicional:** **Opció A** (Arrossegament / *Drag and Drop* per a reordenar la selecció, mantenint opcions de teclat).

## 6. Esbós de les zones de la pantalla
- **Capçalera (Header):** Títol de l'aplicació (*MyGimBro*) i subtítol descriptiu.
- **Zona central (Dos blocs en paral·lel):**
    - *Panell esquerre:* Catàleg d'exercicis (amb cercador, filtre per categories i opcions d'ordenació).
    - *Panell dret:* La teua rutina / selecció actual (on s'aplica el *Drag and Drop* i es mostra el resum i validació en temps real).
- **Part inferior:** Formulari de configuració i confirmació local.