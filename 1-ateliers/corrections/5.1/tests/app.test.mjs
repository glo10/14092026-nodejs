import { describe, it } from 'vitest'
import request from 'supertest'
import app from '../app.mjs'

// describe() décrit une suite de tests
describe("Testing route GET /teams/:id", () => {
  // it() ou son alias test() effectue le test avec une assertion
  it.todo("Should have 404 when id is not numeric");
  it.todo("Should have 200 when id is numeric")
});

describe("Testing route GET /teams", () => {
  it("Should have status 200", () => {
    // AAA
    // Arrange = preparer l'environnement nécessaire pour tester
    // Act = appeler vos fonctions ou réaliser l'action à tester
    // Assert = vérifications (vérifier que le résultat obtenu = résultat attendu)
    return request(app) // Arrange
    .get('/teams') // Act 
    .expect(200) // Assert
  });
  it("Should have JSON data", () => {
    return request(app)
    .get('/teams')
    .expect('Content-Type', /json/)
  });

  it("Should have a collection(array) of teams", async () => {
    const response = await request(app)
      .get('/teams')
      expect(Array.isArray(response.body)).toBe(true)
  });
});

describe.todo("Testing route POST /teams");
