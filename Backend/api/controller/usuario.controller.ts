import { Request, Response} from "express"
import { ProductoController } from "./producto.controller";
import Usuario from "../models/usuario.modelo";
import { NextFunction } from "express-serve-static-core";
import { createRefreshToken, createAccessToken } from '../services/token.services';

export class UsuariosController {
  constructor() {
  
  }
  async listar(req: Request, res: Response, next: NextFunction) {
    let results = await Usuario.find()
  
    res
      .json(results) 
  }
  async detallar(req: Request, res: Response, next: NextFunction) {
    const _id = req.params.id
    const result = await Usuario.findOne({_id})
  
    res.json(result)
  }
  async insertar(req: Request, res: Response, next: NextFunction) {
    const refreshToken = createRefreshToken()
    const datos = Object.assign({}, req.body)
    datos.refreshToken = refreshToken

    const nuevo = new Usuario(datos)
    let nuevoUsuario = await nuevo.save()
  
    res.json({status: 200, message: "User inserted"})
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const correo = req.body.correo.trim() 
    const contrasena = req.body.contrasena.trim()
    const usuario = await Usuario.findOne({correo, contrasena})
    if(usuario) {
      const accessToken = createAccessToken(usuario._id, usuario.nombre)
      const refreshToken = usuario.refreshToken

      res.json({status: 200, tokens: {refreshToken, accessToken}})
    } else {
      res
        .status(404)
        .json({
          status: 404,
          message: "Email and password are invalid"
        })
    }

  }
  async newAccessToken(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.body.refreshToken

    const usuario = await Usuario.findOne({refreshToken})

    if(usuario) {
      const accessToken = createAccessToken(usuario._id, usuario.nombre)

      res
        .json({
          accessToken
        })
    } else {
      res
        .status(404)
        .json({
          status:404,
          message: "User not found"
        })
    }
  }
}
