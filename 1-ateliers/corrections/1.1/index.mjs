import { stdin as input, stdout as output } from 'node:process'
import { createInterface } from 'readline/promises'

/**
 * idem que 
 * const app = createInterface({ input: process.stdin, output: process.stdout })
 *  ou idem que 
 * const app = createInterface(process.stdin, process.stdout)
 */ 
const app = createInterface({ input, output })
/**
 * await met la promesse en pause (donne illusion d'une exécution séquentielle, attendre d'avoir le résultat avant d'exec la suite)
 * autrement dit on fait de l'asynchrone tout en ayant un semblant d'une exécution séquentielle (ligne par linge tels que vous avez rédigé votre code)
 */ 
try {
    const lastName = await app.question('Quel est votre nom ? ') 
    const firstName = await app.question('Quel est votre prénom ? ')
    const user = JSON.stringify({ firstName, lastName })
    console.log(`Bonjour ${lastName} ${firstName} !`, user)
} catch(error) {
    console.error('Erreur', error)
} finally {
    app.close()
}