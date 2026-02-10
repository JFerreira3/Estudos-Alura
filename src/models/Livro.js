import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: { type: String },
    titulo: {
      type: String,
      required: [true, "O título do erro é obrigatório"]  // campo obrigatório e mongoose habilita colocar mensagem de erro personalizada que será utilizada no middleware manipulador de erro
    },
    autor: { type: mongoose.Schema.Types.ObjectId, ref: 'autores', required: [true, "O autor(a) é obrigatório"] },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Clássicos", "Rocco", "Galera"],
        message: "A editora {VALUE} não é um valor permitido"
      } // limita opções para editora
    },
    numeroPaginas: {
      type: Number,
      // min: [10, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
      // max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
      
      // EXEMPLO DE VALIDAÇÃO PERSONALIZADA (precisa ser na propriedade "validate"):  
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    },
  }
);

const livros = mongoose.model('livros', livroSchema);

export default livros;