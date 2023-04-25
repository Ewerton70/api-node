import livros from '../models/Livro.js'
import EditoraController from '../controllers/editoraController.js'
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

    static async listarLivroPorEditora(req, res) {
        const editoraNome = req.query.editora; // obter o nome da editora a partir da requisição

        var editora = await EditoraController.buscarEditoraPorNome(editoraNome);

        if (!editora) {
            res.status(500).send('Erro ao buscar livros.');
        } else {
            livros.find({ 'editora': editora })
                .populate('autor')
                .populate('editora')
                .exec((err, livros) => {
                    res.status(200).json(livros);
                });
        }
    }
}
export default LivroController

