import { Router } from "express";
import { login, register, showData } from "./controllers/controllerUsuario.js";
import {registrarEmpresa} from './controllers/controllerEmpresa.js';
import {criarPublicacao, listPosts} from './controllers/controllerPublicacao.js';

const router = Router();

//Rotas Usuarios
router.post('/usuarios/registrar', register);
router.post('/usuarios/login/', login);
router.get('/usuarios/mostrar/:id', showData);

//Rotas Empresas
router.post('/empresas/registrar', registrarEmpresa);

//Rotas Postagens
router.post('/postagem/postar/', criarPublicacao);
router.get('/postagem/listar/', listPosts);

//Rotas Comentarios
router.post('/postagem/comentar/:id_postagem');
router.put('/comentarios/editar/:id');
router.delete('/comentarios/deletar/:id');

//Rotas Curtidas
router.post('/postagem/avaliar/:id_postagem');

export default router;