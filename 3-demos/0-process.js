/**
 * Programme Node
 * un fichier avec une extension js
 * Pour le lancer :
 * node nomDufichier.js
 * Pour la production on utilisera le module pm2 nomDuFichier.js
 * Pour le développement lancer en mode watch (dès qu'il y a une modif le programme redémarre)
 * node --watch nomDuFichier.js
 */
console.log('process', process.argv, 'env', process.env)
console.log('glodie', process.argv[3])