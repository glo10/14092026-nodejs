import { hash, compare, genSalt } from 'bcrypt'
/**
 * Générer un sel (clé ou secret pour hasher les données)
 * Plus le nombre est grand plus l'algorithme de hash sera complexe
 *  et plus gourmand en ressource donc perte de perf
 * la valeur 10 est un bon compromis entre la perf et la sécurité
 */ 
genSalt(10)
.then(data => console.log('data 10', data))
genSalt(100)
.then(data => console.log('data 100', data))
const passwordPlain = 'admi'
const passwordHashed = '$2b$10$9v/1/gxMv3uYZvH95fmCauV.PXLUOkU4/czodgFogMZoBEGxlguXW'
/**
 * Cas d'utilisation par excellence pour les mots de passe qui ne doivent pas être stocké en clair
 * Et on ne doit pas revenir à la valeur initiale
 * 
 * Pour un même mot de passe, la fonction hash génère toujours des hashs différents
 * Donc impossible de se rendre compte que 2 utilisateurs possèdent le même mot de passe
 * en comparant les hashs
 */ 
hash(passwordPlain, 10, (err, passwordHashed) => {
  if(!err) {
    console.log('résultat du mot de passe hashé par la fonction', passwordHashed)
  } else {
    console.error('KO', err.message)
  }
})


/**
 * Comparaison entre mot de passe en clair et hashé
 * le mdp hashé est généralement persisté dans une base de données
 */
compare(passwordPlain, passwordHashed)
.then((result) => {
  console.log('result', result)
  if(result) {
    console.log('mots de passe identique', result)
    /**
     * Ici on peut créer une session ou un JWT mais on utiliser un Promise.all qui lance les 2 opérations en parallèle
     * Pour éviter d'imbriquer une promesse dans une promesse
     * */
  } else {
    // Déclenchement dans le code d'une erreur personnalisée
    throw new Error('mot de passe incorrect')
  }
})
.catch(error => console.error('erreur dans le catch', error.message))