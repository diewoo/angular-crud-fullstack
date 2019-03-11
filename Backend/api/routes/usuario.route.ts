import express = require("express")
import {UsuariosController} from '../controller/usuario.controller'
import {handlerErrors} from "../../handlers/errors.handler";
import {authentication} from "../policies/authentication.policy";
const router = express.Router()
const controller = new UsuariosController()

router.post("/login", handlerErrors.cacheo(controller.login))
router.post("/registro", handlerErrors.cacheo(controller.insertar))
router.get("/", handlerErrors.cacheo(controller.listar))
router.get("/:id", authentication, handlerErrors.cacheo(controller.detallar))
router.post("/new-access-token", handlerErrors.cacheo(controller.newAccessToken))
export {router}