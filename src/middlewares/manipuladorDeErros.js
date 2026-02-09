import mongoose from "mongoose";
import ErroBase from "../erros/erroBase.js";
import RequisicaoIncorreta from "../erros/RequisicaoIncorreta.js";
import ErroValidacao from "../erros/ErroValidacao.js"
import NaoEncontrado from "../erros/NaoEncontrado.js";


function manipuladorDeErros(erro, req, res, next) { // mddlewares de tratamento de erros recebem 4 parametros

    // middleware utilizado para tratar erros e reutilizar código

    console.log(erro);  // imprime o erro para a pessoa desenvolvedora

    if (erro instanceof mongoose.Error.CastError) {
        // erro de bad request para se pesquisarem por um formato de id do mongoDB incorreto
        new RequisicaoIncorreta().enviarResposta(res);
        // res.status(400).send({ message: 'Um ou mais dados fornecidos estão incorretos.' })
    } else if (erro instanceof mongoose.Error.ValidationError) {
        // erros de validação
        // quando é um erro de validação do mongoose.Error.ValidationError, o erro possui a propriedade errors (erro.errors)

        new ErroValidacao(erro).enviarResposta(res);
        // res.status(400).send({message: `Os seguintes erros foram encontrados: ${mensagensErro}`});        
    } else if (erro instanceof NaoEncontrado) {
        erro.enviarResposta(res);
    } else {
        new ErroBase().enviarResposta(res);
    }

};

export default manipuladorDeErros;