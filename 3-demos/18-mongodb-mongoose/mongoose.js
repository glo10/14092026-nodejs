import UserModel from './models/user.js'
import { mongoose } from 'mongoose'
import { loadEnvFile } from 'node:process'
loadEnvFile()
// Manipulation via Mongoose
/**
 * Avant de faire les opérations CRUD, il faut se connecter au serveur MongoDB
 * Attention ici, volontairement, je n'ai pas spécifié la base de données donc MongoDB va utiliser par défaut la base de données nommée test
 *  Pour éviter des incohérences, il est conseillé d'indiquer la BDD dans l'URL de connexion ici process.env.MONGO_DB_DOCKER
 */
const res = await mongoose.connect(process.env.MONGO_DB_DOCKER)
// 4 états 0 : disconnected, 1: connected, 2 : en cours de connection et 3: en cours de deco
if(res.connection.readyState === 1) {
    console.log('connecté')
} else {
    // C'est mieux de déclencher puis de gérer l'exception plutôt que de tout couper comme c'est fait ici
    process.exit(1) // on arrête le programme avec une erreur
}

// une fois connecté, on peut faire les opérations CRUD, les méthodes sont identiques entre MongoDB natif et Mongoose
const user1 = new UserModel({
    firstname: 'user 1',
    lastname: 'user 1 lastname',
})
// Création via la méthode .save() à partir de l'utilisation d'une instance d'un model
user1.save()
.then(res => console.log('resultat ajout user 1', res))
.catch(error => console.error('erreur ajout user 1', error))

// Récup utilisateurs depuis le model (attention depuis le modèle directement pas l'instance déclarée avec l'opérateur new)
UserModel.find()
.then(res => console.log('resultat find users', res))
.catch(error => console.error('erreur find users', error))
