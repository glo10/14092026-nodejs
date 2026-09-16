import { Schema, model } from 'mongoose'

export default model('User', Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: false, unique: true },
    isAdmin: { type: Boolean, required: false },
    birthday: { type : Date, required: false},
    departementId: { type: Number, required: false }
}))

// UNE AUTRE NOTATION
// const userSchema = Schema({
//     firstname: { type: String, required: true },
//     lastname: { type: String, required: true },
//     email: { type: String, required: false, unique: true },
//     isAdmin: { type: Boolean, required: false },
//     birthday: { type : Date, required: false},
//     departementId: { type: Number, required: false }
// })
// export const userModel = model('User', userSchema)