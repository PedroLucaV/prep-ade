import conn from "../config/conn.js";
import {DataTypes} from 'sequelize'
import Empresas from "./empresaModel.js";

const Publicacao = conn.define('publicacoes', 
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    local: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING(200),
        allowNull: false
    }
},
{
    createdAt: true,
    updatedAt: true
})

Empresas.hasMany(Publicacao, {foreignKey: "id_empresa"})
Publicacao.belongsTo(Empresas, {foreignKey: 'id_empresa'});

export default Publicacao;