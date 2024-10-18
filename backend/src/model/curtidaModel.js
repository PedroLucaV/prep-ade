import conn from '../config/conn.js'
import { DataTypes } from 'sequelize'
import Usuario from './usuarioModel.js';
import Publicacao from './publicacaoModel.js';

const Curitda = conn.define('curtida',
{
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    tipo_avaliacao: {
        type: DataTypes.ENUM(["up", "down"]),
        allowNull: false
    }
},
{
    createdAt: true,
    updatedAt: true
})

Publicacao.belongsToMany(Usuario, {through: {model: Curitda, unique: false}, foreignKey: "id_publicacao"});
Usuario.belongsToMany(Publicacao, {through: {model: Curitda, unique: false}, foreignKey: "id_usuario"});

export default Curitda;