import jwt from 'jsonwebtoken';

const createUserToken = async (user, req, res) => {
    const token = jwt.sign(
        {
            nome: user.nome,
            id: user.id
        },
        "SENH4HYPERMEGASAFEST",
        {
            expiresIn: '12h'
        }
    )

    res.status(200).json({
        message: `Usuario: ${user.nome} logado com sucesso!`,
        token,
        usuarioId: user.id
    })
}

export default createUserToken;