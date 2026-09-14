/**
 * Import des fonctions classiques (sans le suffixe /promise)
 *  Généralement on obtient des fonctions asynchrones avec une callback function
 * Import des fonctions avec le suffixe /promises
 *  Utilisation des fonctions sous forme de promesse avec .then() et .catch()
 * 
 * Extension .mjs pour spécifier le standard ECMASCRIPT 
 * Extension .cjs pour le standard CommonJS
 * Ces extensions ne sont pas obligatoires, en l'absence d'un package.json avec la clé et valeur ci-après
 * Ces extensions aide le moteur à comprendre le standard utilisé
 *  "type":"module" pour EcmaScript
 *  "type":"commonjs" pour CommonJS
 */
import { createInterface } from 'node:readline/promises'

const app = createInterface(process.stdin, process.stdout)
app.question('Première question ?')
.then((answer) => { // on récupère la donnée suite au succès
    console.log('answer', answer)
})
.catch(error => { // on récupère l'erreur
    console.error('Erreur première question', error)
})
.finally(() => {
    app.close()
})
