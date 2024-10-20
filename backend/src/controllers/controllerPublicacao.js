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
        const posts = await Publicacao.findAll();
        res.status(200).json(posts)
    }catch(error){
        res.status(500).json({error})
        console.log(error);
    }
}