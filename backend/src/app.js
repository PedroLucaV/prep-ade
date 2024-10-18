import express from 'express';
import cors from 'cors';
import router from './router.js';

import Empresas from './model/empresaModel.js';
import Usuario from './model/usuarioModel.js';
import Publicacao from './model/publicacaoModel.js';
import Comentario from './model/comentarioModel.js';
import Curtida from './model/curtidaModel.js'

const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(('/'), router);

app.use('*', (req, res) => {
    res.status(404).json({erro: "Erro 404", message: "Content not founded"})
})

export default app;