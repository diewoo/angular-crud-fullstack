import {Request, Response, NextFunction} from "express"
import {decodeAccessToken} from "../services/token.services";

const authentication = (req : Request, res : Response, next : NextFunction) => {
  if (req.headers["authorization"]) {
    const cabecera = req
      .headers["authorization"]
      .toString()
    const accessToken = cabecera.split(" ")[1]

    decodeAccessToken(accessToken).then((data : any) => {
      const _id = data._id
      const nombre = data.nombre

      res.locals._id = _id
      res.locals.nombre = nombre

      next()
    }, (error : any) => {
      res
        .status(error.status)
        .json({status: error.status, message: error.message})
    })
  } else {
    res
      .status(409)
      .json({status: 409, message: "User is not logged"})
  }
}

export {authentication}