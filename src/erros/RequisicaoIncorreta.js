import ErroBase from "./ErroBase.js";

class RequisicaoIncorreta extends ErroBase {
    constructor(mensagem = "Um ou mais dados fornecidos estão incorretos") {
        super(mensagem, 400); // chama o contrutor do ./ErroBase.js
    }
}

export default RequisicaoIncorreta;