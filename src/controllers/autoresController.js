import autores from '../models/Autor.js'

class AutorController {
    static listarAutores = (req, res) => {
        autores.find((err, autores) => {
            res.status(200).json(autores)
        })
    }

    static listarAutorPorId = (req, res) => {
        const id = req.params.id;

        autores.findById(id, (err, autores) => {
            !err ? res.status(200).send(autores) : res.status(400).send({ message: `${err.message} - Id do Autor não localizado.` })
        })
    }

    static cadastrarAutores = (req, res) => {
        let autor = new autores(req.body);

        autor.save((err) => {
            !err ? res.status(201).send(autor) : res.status(500).send({ message: `${err.message} - Falha ao cadastrar autor.` })
        });
    }

    static atualizarAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            !err ? res.status(200).send({ message: "Autor atualizado com sucesso!" }) : res.status(500).send({ message: err.message })
        })
    }

    static excluirAutor = (req, res) => {
        const id = req.params.id;

        autores.findByIdAndDelete(id, (err) => {

            !err ? res.status(200).send({ message: 'Autor foi excluido com sucesso!' }) : res.status(500).send({ message: err.message })
        })
    }

}

export default AutorController