import { literal } from 'sequelize';
import Comentario from '../model/comentarioModel.js';
import Empresas from '../model/empresaModel.js';
import Publicacao from '../model/publicacaoModel.js';

export const criarPublicacao = async (req, res) => {
    const {titulo, local, cidade, imagem, id_empresa} = req.body;
    const post = {titulo, local, cidade, imagem, id_empresa}
    try{        
        const empresa = await Empresas.findByPk(id_empresa);
        if(!empresa){
            return res.status(404).json({message: "Empresa não encontrada"})
        }

        await Publicacao.create(post);
        res.status(201).json({message: "Publicação criada!"})
    }catch(error){
        res.status(500).json({error})
        console.log(error);
    }
}

export const listPosts = async (req, res) => {
    try{
        const posts = await Publicacao.findAll({attributes: [
            'id', 'titulo', 'imagem', 'local', 'cidade', 
            [literal(`(SELECT COUNT(*) FROM curtidas WHERE curtidas.id_publicacao = publicacoes.id AND curtidas.tipo_avaliacao = "up")`), 'total likes'],
            [literal(`(SELECT COUNT(*) FROM curtidas WHERE curtidas.id_publicacao = publicacoes.id AND curtidas.tipo_avaliacao = "down")`), 'total deslikes'],
            [literal(`(SELECT COUNT(*) FROM comentarios WHERE comentarios.id_publicacao = publicacoes.id)`), 'total comments']
    ]});
        res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error})
        console.log(error);
    }
}

export const showOne = async (req, res) => {
    const {id} = req.params
    try {
        if(!id){
            return res.status(400).json({message: "O Id da publicação não pode ser vazio"})
        }
        const publicacao = await Publicacao.findByPk(id, {attributes: [
            'id', 'titulo', 'imagem', 'local', 'cidade', 
            [literal(`(SELECT COUNT(*) FROM curtidas WHERE curtidas.id_publicacao = "${id}" AND curtidas.tipo_avaliacao = "up")`), 'total likes'],
            [literal(`(SELECT COUNT(*) FROM curtidas WHERE curtidas.id_publicacao = "${id}" AND curtidas.tipo_avaliacao = "down")`), 'total deslikes'],
            [literal(`(SELECT COUNT(*) FROM comentarios WHERE comentarios.id_publicacao = "${id}")`), 'total comments']
        ], raw: true});
        const comentarios = await Comentario.findAll({where: {id_publicacao: id}, attributes: ['id', 'comentario', 'id_usuario', 
            [literal(`(SELECT nome FROM usuarios WHERE usuarios.id = comentarios.id_usuario)`), 'nome_usuario']
        ]})
        publicacao.comentarios = comentarios
        res.status(200).json(publicacao)

    } catch (error) {
        res.status(500).json({error})
        console.log(error);
    }
}