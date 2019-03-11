import { handlerErrors } from "../../handlers/errors.handler";
var express=require('express');
import {ProductoController} from '../controller/producto.controller'
import { authentication } from "../policies/authentication.policy";
const router= express.Router()
const controller = new ProductoController()
router.get('/',authentication,handlerErrors.cacheo(controller.obtenerProductos));
router.get('/:id',authentication,handlerErrors.cacheo(controller.obtenerProductoPorId));
router.post('/',authentication,handlerErrors.cacheo(controller.agregarProducto));
router.put('/:id',authentication,handlerErrors.cacheo(controller.modificar))
router.delete('/:id',authentication,handlerErrors.cacheo(controller.eliminar));

export {router}