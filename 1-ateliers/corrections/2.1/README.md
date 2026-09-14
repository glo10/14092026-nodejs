# Correction atelier 2.1

## Commandes à effectuer

1. `npm init -y`
2. `npm init @eslint/config@latest`
- How would you like to use ESLINT ? réponse ***"To check syntax and find problems"***
- What type of modules does your project use ? ***"JavaScript modules (import/export)"***
- Which framework does your project use ? ***"None of these"***
- Does your project use TypeScript ? ***"No"***
- Where does your project run ? ***"Node"***
- Would you like to install them now ? ***"yes"***
- Which package manager do you want to use ? ***"npm"***
3. `npm i concurrently`
4. `npm i -D vitest cypress typescript`

---

## Bonus

1. `npm i -g yarn`
```bash
yarn init
yarn init @eslint/config@latest
yarn add concurrently
yarn add --dev vitest cypress typescript
```

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/2.1

#### `1-ateliers/corrections/2.1/eslint.config.mjs`

```javascript
import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
]);

```

#### `1-ateliers/corrections/2.1/package.json`

```json
{
  "name": "2.1",
  "version": "1.0.0",
  "description": "1. `npm init -y`\r 2. `npm init @eslint/config@latest`\r - How would you like to use ESLINT ? réponse ***\"To check syntax and find problems\"***\r - What type of modules does your project use ? ***\"JavaScript modules (import/export)\"***\r - Which framework does your project use ? ***\"None of these\"***\r - Does your project use TypeScript ? ***\"No\"***\r - Where does your project run ? ***\"Node\"***\r - Would you like to install them now ? ***\"yes\"***\r - Which package manager do you want to use ? ***\"npm\"***\r 3. `npm i concurrently`\r 4. `npm i -D vitest cypress typescript`",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@eslint/js": "^9.39.5",
    "eslint": "^9.39.5",
    "globals": "^17.12.0"
  }
}

```

<!-- END AUTO-GENERATED -->