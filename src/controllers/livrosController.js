import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {

    try {
      const buscaLivros = livros.find();
      req.resultado = buscaLivros;
      next();

    } catch (erro) {
      next(erro); // next enviando erro para ser tratdo pelo middleware ../middlewares/manipuladorDeErros.js
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id);

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next();
      }
    } catch (erro) {
      next(erro); // next enviando erro para ser tratdo pelo middleware ../middlewares/manipuladorDeErros.js
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro); // next enviando erro para ser tratdo pelo middleware ../middlewares/manipuladorDeErros.js
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro atualizado com sucesso" });
      } else {
        next();
      }
    } catch (erro) {
      next(erro); // next enviando erro para ser tratdo pelo middleware ../middlewares/manipuladorDeErros.js
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: "Livro removido com sucesso" });
      } else {
        next();
      }
    } catch (erro) {
      next(erro); // next enviando erro para ser tratado pelo middleware ../middlewares/manipuladorDeErros.js
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca);

        req.resultado = livrosResultado;
        next();
      } else {
        res.status(200).send([]);
      }


    } catch (erro) {
      next(erro); // next enviando erro para ser tratdo pelo middleware ../middlewares/manipuladorDeErros.js
    }
  }

}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  let busca = {};

  if (editora) busca.editora = editora;
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if (minPaginas) busca.numeroPaginas = { $gte: minPaginas };
  if (maxPaginas) busca.numeroPaginas = { $lte: maxPaginas };

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });
    if (autor !== null) {
      busca.autor = autor._id
    } else {
      busca = null;
    }

  }


  return busca;

}

export default LivroController