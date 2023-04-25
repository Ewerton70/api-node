import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://ewertonoliveira1108:123@node-livraria.7bdtre5.mongodb.net/node-api')

let db = mongoose.connection

export default db
