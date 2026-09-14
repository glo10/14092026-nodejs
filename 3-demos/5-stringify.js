const lastname = 'Doe'
const firstname = 'John'
// Objet Javascript avec les propriétés lastname et firstname
const user = {
    lastname,
    firstname
}
/**
 * Pour avoir du JSON (JavaScript Notation Object = format textuel proche de la notation objet littéral de JS)
 * il faut transformer l'objet en string via la fonction JSON.stringify(user)
 */
const userStr = JSON.stringify(user)
console.log('user str', userStr, 'user object', user)