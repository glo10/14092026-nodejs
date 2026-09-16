# Correction atelier 8.1 : tests unitaires avec *node:test* et *node:assert*

## Installation et lancement des tests

Ici utilisation des modules natives de Node pour le testing :
- node:test
- node:assert
Pour des tests basiques, c'est suffisant par contre les modules de testing dédié comme Vitest propose plus de fonctionnalités.

Depuis la racine de ce dossier, lancez la commande suivante : 

```bash
npm run test
```

---

## Sources

<!-- AUTO-GENERATED -->

### 1-ateliers/corrections/8.1

#### `1-ateliers/corrections/8.1/maths.mjs`

```javascript
export const sum = (...args) => {
  let sum = 0
  args.forEach(nb => sum += nb)
  return sum
}

export const divide = (nb1, nb2) => {
  if(nb2 == '0') throw new Error('Divide by 0 impossible')
  return nb1/nb2
}
```

#### `1-ateliers/corrections/8.1/package.json`

```json
{
  "name": "8.1",
  "version": "1.0.0",
  "description": "Node native testing with TDD approach",
  "scripts": {
    "test": "node --test"
  },
  "keywords": [
    "node:test",
    "node:assert",
    "TDD"
  ],
  "author": "Glodie Tshimini",
  "license": "ISC"
}

```

#### `1-ateliers/corrections/8.1/tests/maths.test.mjs`

```javascript
import assert from "node:assert";
import { sum, divide } from "../maths.mjs";
import { describe, it } from "node:test";
describe("Testing Maths functions", () => {
  describe("Testing sum", () => {
    it("Should have 6 when sum(2,4)", () => {
      // Arrange
      const n1 = 2;
      const n2 = 4;
      // Act
      const result = sum(n1, n2);
      // Assert
      assert.strictEqual(result, 6);
    });

    it("Should have 45 when sum(0,1,2,3,4,5,6,7,8,9)", () => {
      assert.strictEqual(45, sum(0,1,2,3,4,5,6,7,8,9))
    })
  });
  describe("Testing division", () => {
    it("Should have 2 when divide(8,2)", () => {
      assert.strictEqual(divide(8, 2), 4);
    });
    it("Should throw Error Exception when nb2 equals 0", () => {
      assert.throws(() => divide(10, 0), Error);
    });
    it("Should have error message 'Divide by 0 impossible'", () => {
      assert.throws(() => divide(10, 0), (err) => {
        assert.equal(err.message, 'Divide by 0 impossible')
        return true
      })
    });
  });
});

```

<!-- END AUTO-GENERATED -->