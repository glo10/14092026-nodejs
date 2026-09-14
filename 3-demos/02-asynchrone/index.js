/**
 * Différentes façon de faire de l'asynchrone
 *  1. Promesses
 *  2. Callback function
 *  3. Timers : setTimeout(), setInterval(), setImidiate()
 */

// Récupérer le bouton en utilisant le DOM
const btn = document.querySelector('button')
if(btn) { // vérifier que le bouton existe avant de gréffer un event
    // Gréffer un événement click sur le bouton
    // Quand on clique, il y a aura une callback function qui sera exécutée
    btn.addEventListener('click', function() {
        console.log("J'ai cliqué")
    })
}
// Utilisation d'une callback nommée
const input = document.querySelector('input')
if(input) {
    input.addEventListener('keypress', cbKeypress)
}
function cbKeypress() {
    console.log("j'ai tapé sur le clavier")
}
