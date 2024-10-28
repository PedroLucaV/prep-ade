import Comentario from '../model/comentarioModel.js'
import getToken from '../helpers/getToken.js';
import getUserByToken from '../helpers/getUserByToken.js'
import Publicacao from '../model/publicacaoModel.js';

export const criarComentario = async (req, res) => {
    const post_id = req.params.id_postagem;
    const {comentario} = req.body;
    try {
        const token = getToken(req);
        const user = await getUserByToken(token);
        const userId = user.dataValues.id;
        if(!post_id){
            return res.status(400).json({message: "Informe o id da postagem"})
        }
        if(!comentario){
            return res.status(400).json({message: "Campo comentario não pode ser vazio"})
        }
        const post = await Publicacao.findByPk(post_id);
        if(!post){
            return res.status(404).json({message: "Publicação não encontrada"})
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

export const deletarCommentario = async (req, res) => {
    const id = req.params.id;
    try {
        const token = getToken(req);
        const user = await getUserByToken(token);
        const id_usuario = user.dataValues.id;
        const comentario = await Comentario.findByPk(id);
        if(!comentario){
            return res.status(404).json({message: "Comentario não encontrado"})
        }
        if(id_usuario != comentario.id_usuario){
            return res.status(403).json({message: "Você não pode realizar esta ação!"});
        }
        await Comentario.destroy({where: {id}});
        res.status(204).end()
    } catch (error) {
        res.status(500).json({ error })
        console.log(error);
    }
}