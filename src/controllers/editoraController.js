import editoras from '../models/Editora.js'

class EditoraController {
    
    static listarEditora = (req, res) => {
        editoras.find((err, editoras) => {
            res.status(200).json(editoras)
        })
    }

    static async buscarEditoraPorNome(nome) {
        return await editoras.findOne({ 'nome': nome });
    }
    
    static listarEditoraPorNome = (req, res) => {
        const nome = req.query.nome;

        editoras.findOne(nome, (err, editoras) => {
            !err ? res.status(200).send(editoras) : res.status(400).send({ message: `${err.message} - Nome da editora não localizado.` })
        })
    }

    static listarEditoraPorId = (req, res) => {
        const id = req.params.id;

        editoras.findById(id, (err, editoras) => {
            !err ? res.status(200).send(editoras) : res.status(400).send({ message: `${err.message} - Id do editoras não localizado.` })
        })
    }

    static cadastrarEditora = (req, res) => {
        let editora = new editoras(req.body);

        editora.save((err) => {
            !err ? res.status(201).send(editora) : res.status(500).send({ message: `${err.message} - Falha ao cadastrar editoras.` })
        });
    }

    static atualizarEditora = (req, res) => {
        const id = req.params.id;

        editoras.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            !err ? res.status(200).send({ message: "editoras atualizado com sucesso!" }) : res.status(500).send({ message: err.message })
        })
    }

    static excluirEditora = (req, res) => {
        const id = req.params.id;

        editoras.findByIdAndDelete(id, (err) => {

            !err ? res.status(200).send({ message: 'editoras foi excluido com sucesso!' }) : res.status(500).send({ message: err.message })
        })
    }

}

export default EditoraController