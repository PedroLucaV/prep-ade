import Empresas from "../model/empresaModel.js";
import Curtida from '../model/curtidaModel.js'

export const registrarEmpresa = async (req, res) => {
    const {nome, imagem} = req.body;
    try{        
        const empresa = await Empresas.create({nome, imagem});
        res.status(201).json({message: "Empresa criada!", data: empresa})
    }catch(error){
        res.status(500).json({error})
        console.log(error);
    }
}

export const getEmpresa = async (req, res) => {
    const {id} = req.params;
    try {
        const infoEmpresa = await Empresas.findByPk(id, {raw: true});
        const likes = await Curtida.count({where: {tipo_avaliacao: "up"}});
        const deslike = await Curtida.count({where: {tipo_avaliacao: "down"}});
        const empresa = {
            id: infoEmpresa.id,
            nome: infoEmpresa.nome,
            imagem: infoEmpresa.imagem,
            likes,
            deslike
        }
        res.status(200).json(empresa)
    } catch (error) {
        res.status(500).json({error})
        console.log(error);
    }
}