const { sign, verify }  = require('jsonwebtoken')

// Création du token

const token2Hours = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2xvZGllIiwiYWdlIjozMywiaWF0IjoxNzMzOTEzOTQ5LCJleHAiOjE3MzM5MjExNDl9.ruw1DG_S-PPiyNfPMcCviRO6y8f9rEhYEyIxbPUYZ3w'
const token10Second = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2xvZGllIiwiYWdlIjozMywiaWF0IjoxNzMzOTE0MDI2LCJleHAiOjE3MzM5MTQwMzZ9.36ZDoOXRfyGazS0bPdlBBR2bbtd9a-huOoJmqsBs_6w'
const user = {
  name: 'Glodie',
  age: 33
}

sign(user, 'SECRET', { expiresIn: '10s'}, (error, token) => {
  if(!error) console.log('token généré', token)
})

verify(token10Second, 'SECRET', (error, result) => {
  if(!error) console.log('vérification token', result)
  else console.log('erreur', error)
})