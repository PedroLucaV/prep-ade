import Comentario from '../model/comentarioModel.js'
import getToken from '../helpers/getToken.js';
import getUserByToken from '../helpers/getUserByToken.js'

export const criarComentario = async (req, res) => {
    const post_id = req.params.id_postagem;
    const {comentario} = req.body;
    try {
        const token = getToken(req);
        const user = await getUserByToken(token);
        const userId = user.dataValues.id;
        if(!comentario){
            return res.status(400).json({message: "Campo comentario não pode ser vazio"})
        }

        const newComment = {comentario ,id_publicacao: post_id, id_usuario: userId};
        await Comentario.create(newComment);
        res.status(201).json({message: "Comentario criado", data: newComment});
    } catch (error) {
        res.status(500).json({ error })
        console.log(error);
    }
}

export const listarComentarios = async (req, res) => {
    const post_id = req.params.id_postagem;
    try {
        const comments = await Comentario.findAll({where: {id_publicacao: post_id}});
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error })
        console.log(error);
    }
}