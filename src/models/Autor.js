import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},             
    nome: {type: String, required: [true, "O nome do(a) autor(a) é obrigatório" ]}, // campo obrigatório e mongoose habilita colocar mensagem de erro personalizada que será utilizada no middleware manipulador de erro
    nacionalidade: {type: String}
  },
  {
    versionKey: false
  }
)

const autores = mongoose.model("autores", autorSchema)

export default autores;