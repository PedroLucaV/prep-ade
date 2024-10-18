import conn from '../config/conn.js'
import { DataTypes } from 'sequelize'
import Usuario from './usuarioModel.js';
import Publicacao from './publicacaoModel.js';

const Comentario = conn.define('comentarios',
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    comentario: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3
        }
    }
},
{
    createdAt: true,
    updatedAt: true
})

Publicacao.belongsToMany(Usuario, {through: {model: Comentario, unique: false}, foreignKey: "id_publicacao"});
Usuario.belongsToMany(Publicacao, {through: {model: Comentario, unique: false}, foreignKey: "id_usuario"});

export default Comentario;