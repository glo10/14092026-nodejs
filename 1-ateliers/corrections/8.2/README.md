# Correction Atelier 8.2 : tests d'intégration des routes de l'API avec *Supertest* et *vitest*

## Installation et lancement des tests

```bash
npm install
npm test
```

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/8.2

#### `1-ateliers/corrections/8.2/package.json`

```json
{
  "name": "8.2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "vitest"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "type": "module",
  "devDependencies": {
    "supertest": "^7.2.2",
    "vitest": "^4.1.0"
  }
}

```

#### `1-ateliers/corrections/8.2/tests/index.test.mjs`

```javascript
import { describe, it } from "vitest";
import request from "supertest";
import app from "../../6.1/app.mjs";

describe("Testing hompeage route API", () => {
  describe("GET /", () => {
    it("Should have status 200", () => {
      return request(app).get("/").expect(200);
    });
    it("Should have JSON data", () => {
      return request(app).get("/").expect("Content-Type", /json/);
    });
    it("Should have a collection(array) of teams", async () => {
      const response = await request(app).get("/");
      expect(Array.isArray(response.body.routes)).toBe(true);
    });

    it("Should have a version from response like x.x or x.x.x", async () => {
      const response = await request(app).get("/");
      expect(response.body.version).toMatch(/\d\.\d(\.\d)?/);
    });
  });
});

```

#### `1-ateliers/corrections/8.2/tests/team.test.mjs`

```javascript
import { describe, it } from "vitest";
import request from "supertest";
import app from "../../6.1/app.mjs";

/**
 * WARNING
 *  il faut utiliser une base de données de test ici pour ne pas polluer la base de données en dev
 * ou hors plan du cours, utiliser des dummies (spy, mock, etc.) pour simuler les tests en vérifiant uniquement si une fonction
 *  est appelée ou en donnant le résultat supposé avoir sans intérroger la base de données
 */

// describe() décrit une suite de tests
describe("Testing teams routes API", () => {
  describe("GET /teams/:name", () => {
    // it() ou son alias test() effectue le test avec une assertion
    it("Should have status 400 when name is a numeric", () => {
      // AAA
      // Arrange = preparer l'environnement nécessaire pour tester
      // Act = appeler vos fonctions ou réaliser l'action à tester
      // Assert = vérifications (vérifier que le résultat obtenu = résultat attendu)
      return request(app) // Arrange
        .get("/teams/10") // Act
        .expect(400); // Assert
    });
    it("Should have a message like 'must be a string'", async () => {
      const response = await request(app).get("/teams/10");
      expect(response.body.message).contain('must be a string');
    });
    it("Should have status 404 when name is not exist", () => {
      return request(app).get("/teams/not_exists").expect(404);
    });
  });

  describe("GET /teams", () => {
    it("Should have status 200", () => {
      return request(app).get("/teams").expect(200);
    });
    it("Should have JSON data", () => {
      return request(app).get("/teams").expect("Content-Type", /json/);
    });

    it("Should have a collection(array) of teams", async () => {
      const response = await request(app).get("/teams");
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  /**
   * Attention ici modification des données de votre bdd
   * Utilisez une bdd dédiée aux tests
   * Pour cela, il suffit de créer une nouvelle base de données MongoDB
   *  cf. documentation de MongoDB pour faire des exports et imports
   * et changer dans le .env les identifiants de connexion
   */ 
  describe.todo("Testing route POST /teams");
});

```

#### `1-ateliers/corrections/8.2/vitest.config.mjs`

```javascript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    testTimeout: 100,
    coverage: {
      reporter: ['html'],
      reportsDirectory: './tests/coverage'
    },
    exclude: [ 'node_modules']
  }
})

```

<!-- END AUTO-GENERATED -->