import Empresas from "../model/empresaModel.js";

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