/**
 * Import des fonctions classiques (sans le suffixe /promise)
 *  Généralement on obtient des fonctions asynchrones avec une callback function
 * Import des fonctions avec le suffixe /promises
 *  Utilisation des fonctions sous forme de promesse avec .then() et .catch()
 */
import { createInterface } from 'node:readline'

const app = createInterface(process.stdin, process.stdout)
try {
   app.question('Première question ?', function(answer) {
        console.log('answer', answer)
    })
} catch(error) {
    console.error('erreur première question', error)
} finally {
    app.close()
}
