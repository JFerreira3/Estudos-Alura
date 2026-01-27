import mongoose from "mongoose"

mongoose.connect(process.env.DB_CONNECTION_STRING); // busca DB_CONNECTION_STRING nas variáveis de ambiente (.env)

let db = mongoose.connection;

export default db;