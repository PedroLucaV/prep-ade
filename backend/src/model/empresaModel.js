import conn from "../config/conn.js";
import {DataTypes} from 'sequelize'

const Empresas = conn.define('empresas', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING(300),
        allowNull: false
    }
},
{
    createdAt: true,
    updatedAt: true
})

export default Empresas;