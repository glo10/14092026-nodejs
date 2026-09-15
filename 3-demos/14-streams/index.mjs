import { get } from 'node:https'
import { createWriteStream } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
const countriesURL = 'https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/refs/heads/master/json/countries%2Bstates%2Bcities.json'

const rootPath = resolve(dirname(fileURLToPath(import.meta.url)))
const jsonFilename = join(rootPath, 'files', 'users.json')
get(countriesURL, (res) => {
    const jsonLocalStream = createWriteStream(jsonFilename)
    // synchronisation 2 flux (gestion synchronisé entre la réponse (lecture) du serveur distant et l'écriture en local)
    res.pipe(jsonLocalStream)
    // écoute event data : l'arrivée des données
    res.on('data', (chunk) => {
        console.log('Données reçues', chunk, chunk.toString())
    })
    // écoute de l'event error : En cas d'erreur côté serveur
    res.on('error', (error) => {
        console.error('error côté serveur', error)
    })
    // écoute de l'évent  finish => fin de traitement
    jsonLocalStream.on('finish', () => {
        console.info('Traitement terminé tout le contenu est écrit en local')
    })

    jsonLocalStream.on('error', (error) => {
        console.error('Erreur écriture du json en local', error)
    })
})