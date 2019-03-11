import { Request, Response, NextFunction } from "express"
import { IError } from "../interfaces/error.interface";

const handlerErrors = {
  notFound: (req: Request, res: Response, next: NextFunction) => {
    let error: IError = new Error("API no encontrada")
    error.status = 404

    next(error)
  },
  cacheo: (ftn: (req: Request, res: Response, next: NextFunction)=>Promise<any>) => {
    return (rq: Request, rs: Response, nx: NextFunction) => {
      return ftn(rq, rs, nx).catch((error: IError) => {
        error.status = 500
        nx(error)
      })
    }
  },
  general: (error: IError, req: Request, res: Response, next: NextFunction) => {
    const obj = {
      status: error.status,
        message: error.message
    }

    if(process.env.ENVIROMENT=="development") obj["stack"]=error.stack

    res
      .status(error.status)
      .json(obj)
  }
}

export { handlerErrors }