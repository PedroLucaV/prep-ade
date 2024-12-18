import { Router } from "express";
import { login, logout, register, showData } from "./controllers/controllerUsuario.js";
import {registrarEmpresa, getEmpresa} from './controllers/controllerEmpresa.js';
import {criarPublicacao, listPosts, showOne} from './controllers/controllerPublicacao.js';
import verifyToken from './helpers/verifyToken.js';
import { criarComentario, listarComentarios, deletarCommentario } from "./controllers/controllerComments.js";

const router = Router();

//Rotas Usuarios
router.post('/usuarios/registrar', register);
router.post('/usuarios/login/', login);
router.get('/usuarios/mostrar', verifyToken, showData);
router.post('/usuarios/logout', logout)

//Rotas Empresas
router.post('/empresas/registrar', registrarEmpresa);
router.get('/empresas/listarEmpresa/:id', getEmpresa)

//Rotas Postagens
router.post('/postagem/postar/', criarPublicacao);
router.get('/postagem/listar/', listPosts);
router.get('/postagem/mostrarUma/:id', verifyToken, showOne);

//Rotas Comentarios
router.post('/postagem/comentar/:id_postagem', verifyToken, criarComentario);
router.get('/postagem/comentarios/:id_postagem', listarComentarios);
router.put('/comentarios/editar/:id');
router.delete('/comentarios/deletar/:id', verifyToken, deletarCommentario);

//Rotas Curtidas
router.post('/postagem/avaliar/:id_postagem');

export default router;