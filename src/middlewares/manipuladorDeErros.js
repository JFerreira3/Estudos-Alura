import mongoose from "mongoose";
function manipuladorDeErros(erro, req, res, next) {
    // midware utilizado para tratar erros e reutilizar código

    if (erro instanceof mongoose.Error.CastError) {
        // erro de bad request para se pesquisarem por um formato de id do mongoDB incorreto
        res.status(400).send({ message: 'Um ou mais dados fornecidos estão incorretos.' })
    }
    res.status(500).send({ message: 'Erro interno de servidor.' });

};

export default manipuladorDeErros;