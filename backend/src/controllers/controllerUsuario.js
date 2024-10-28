import Usuario from "../model/usuarioModel.js";
import createUserToken from "../helpers/createToken.js";

export const login = async (req, res) => {
    const {email, senha} = req.body;
    try{
        const usuario = await Usuario.findOne({where: {email}, raw: true});
        if(!usuario){
            return res.status(404).json({message: "Usuario não encontrado"})
        }
        if(usuario.senha !== senha){
            return res.status(403).json({message: "Senha não condiz"})
        }
        const token = createUserToken(usuario, req, res);
        res.status(200).json(token);
    }catch(error){
        res.status(500).json({error})
        console.log(error);
    }
}

export const register = async (req, res) => {
    const {nome, email, nickname, senha, imagem} = req.body;
    const user = {nome, email, nickname, senha, imagem};
    try{
        const usuarioByEmail = await Usuario.findOne({where: {email: user.email}, raw: true});
        if(usuarioByEmail){
            return res.status(403).json({message: "Já existe um Usuario com este email!"})
        }

        const usuarioByNick = await Usuario.findOne({where: {nickname: user.nickname}, raw: true});
        if(usuarioByNick){
            return res.status(403).json({message: "Já existe um Usuario com este nickname!"})
        }
        
        await Usuario.create(user);
        res.status(201).json({message: "Usuario criado!", data: user})
    }catch(error){
        res.status(500).json({error})
        console.log(error);
    }
}

export const showData = async (req, res) => {
    const {id} = req.params;

    try{
        const user = await Usuario.findByPk(id);
        if(!user){
            return res.status(403).json({message: "Não foi encontrado nenhum usu"})
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({error})
        console.log(error);
    }
}