import conn from "../config/conn.js";
import {DataTypes} from 'sequelize'

const Usuario = conn.define('usuarios', 
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    nickname: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING(80),
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

export default Usuario;