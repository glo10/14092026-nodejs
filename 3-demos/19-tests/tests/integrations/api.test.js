import { describe, it, expect } from 'vitest'
import { app } from '../../src/api.js'
import request from 'supertest'
describe('Testing API', () => {
    describe('Testing GET /users', () => {
        it('Should have 3 users', () => {
            return request(app) // Arrange
            .get('/users') // Act
            .then(response => {
                // Assert
                expect(response.body.length).toEqual(3);
            })
        })

        it('Should have users as array', () => {
            return request(app)
            .get('/users')
            .then(response => {
                expect(Array.isArray(response.body)).toBe(true);
            })
        })

        it('Should be a JSON', () => {
            return request(app)
            .get('/user')
            .expect('Content-Type', /json/)
        })

        it('Should have status code 200', () => {
           return request(app)
            .get('/user')
            .expect(200)
        })
    })
})