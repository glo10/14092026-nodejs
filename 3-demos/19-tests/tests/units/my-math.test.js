import { add } from '../../src/my-math'
import { describe, it, test, expect } from 'vitest'
describe('Testing add function', () => {
    it('Should equals 8 when nb1 = 3 et nb2 = 5', () => {
        // Pattern AAA
        // Arrange
        const nb1 = 3
        const nb2 = 5
        // Act
        const result = add(nb1, nb2)
        // Assert
        expect(result).toBe(8)
    })

    it.todo('Should be -1 when nb1 = -1 and nb2 = 0')
})