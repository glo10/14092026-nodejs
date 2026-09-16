/**
 * Collection => tables
 * Document => tuples ou enreigistrement ou ligne
 * avec MongoDB stockage de type document, pour simplifier un document = JSON
 */
import { loadEnvFile } from 'node:process'
import { MongoClient } from "mongodb";
import { callbackify } from 'node:util';
loadEnvFile()
// connexion au serveur MongoDB
const client = new MongoClient(process.env.MONGO_DB_DOCKER);
try {
  await client.connect();
  // Une fois connecté, on sélectionne la base de données avec laquelle on veut travailler
  const db = client.db("championsleague");
  // On peut faire nos ops CRUD
  const userCollection = db.collection("users");
  // Création d'un utilisateur dans la base de données
  await userCollection.insertOne({
    firstname: "A",
    lastname: "B",
  });

  // Création de plusieurs utilisateurs avec des schémas différents
  await userCollection.insertMany(
    [
        {
            firstname: "C",
            lastname: "D",
            birthday: "01/01/1970",
            isAdmin: false,
        },
        {
            name: "EF",
            birthday: "01/01/1970",
            isAdmin: true,
        },
        {
            name: "GH",
            birthday: "01/01/1970",
            isAdmin: true,
        },
  ]);
  // Lecture = récup d'un document
  userCollection.findOne({ firstname : 'C' })
  .then((user) => {
    console.log('user', user)
  }).catch(err => console.error('Error GET one user', err))
  // Lecture = récup de plusieurs documents (attention on récupère un cursor(pointeur) vers les données avec la méthode find())
  userCollection.find().toArray() // toArray() permet de récupérer tous les utilisateurs
  .then((users) => {
    console.log('users', users)
  }).catch(err => console.error('Error GET many user', err))

  // Modification des données
  userCollection.updateOne({ firstname: 'A'}, { $set: { firstname: "John", lastname: "Doe"}})
  .then((res) => console.log('update', res))
  .catch(err => console.error('Error update user', err))

  const deleteCb = callbackify(userCollection.deleteOne({ firstname: 'B'}))
  deleteCb((err) => {
    if(!err) console.log('user firstname b a été supprimé')
    else console.error('Erreur suppression user fistnme b')
  })
} catch (error) {
  console.error("ERROR, connection mongodb", error);
}
