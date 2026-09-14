# Correction atelier 1.1 : readline

## Lancement du programme

A partir de votre emplacement sur le terminal, il faut indiquer le chemin relatif pour exécuter le fichier *index.mjs* . 

Dans cet exemple, le dossier courant est *1-ateliers* donc

- `node corrections/1.1/index.mjs`

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/1.1/

#### `1-ateliers/corrections/1.1/index.mjs`

```
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
```

#### `1-ateliers/corrections/1.1/package.json`

```json
{
  "name": "1.1",
  "version": "1.0.0",
  "description": "Correction atelier 1.1",
  "main": "index.js",
  "scripts": {
    "start": "node index.mjs",
    "dev": "node --watch index.mjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module"
}

```

<!-- END AUTO-GENERATED -->