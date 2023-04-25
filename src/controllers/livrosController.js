import livros from '../models/Livro.js'

class LivroController {
    static listarLivros = (req, res) => {
        livros.find()
        .populate('autor')
        .populate('editora')
        .exec((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static listarLivroPorId = (req, res) => {
        const id = req.params.id;

        livros.findById(id) 
        .populate('autor', 'nome')
        .populate('editora', 'nome')
        .exec((err, livros) => {
            !err ? res.status(200).send(livros) : res.status(400).send({ message: `${err.message} - Id do livro não localizado.` })
        })
    }

    static cadastrarLivros = (req, res) => {
        let livro = new livros(req.body);

        livro.save((err) => {
            !err ? res.status(201).send(livro) : res.status(500).send({ message: `${err.message} - Falha ao cadastras livro.` })
        });
    }

    static atualizarLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            !err ? res.status(200).send({ message: "Livro atualizado com sucesso!" }) : res.status(500).send({ message: err.message })
        })
    }

    static excluirLivro = (req, res) => {
        const id = req.params.id;

        livros.findByIdAndDelete(id, (err) => {

            !err ? res.status(200).send({ message: 'Livro foi excluido com sucesso!' }) : res.status(500).send({ message: err.message })
        })
    }

    static listarLivroPorEditora = (req, res) =>{
        const editora = req.query.editora
            
        livros.find({'editora': editora},{},(err, livros)=>{
            res.status(200).send(livros)
        })
    }

}

export default LivroController