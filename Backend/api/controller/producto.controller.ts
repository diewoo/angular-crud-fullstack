import * as mongoose from 'mongoose';
import {Request, Response, NextFunction} from "express"
import {ProductSchema} from '../models/producto.modelo'
const Producto = mongoose.model('data', ProductSchema);

export class ProductoController {

  async obtenerProductos(req : Request, res : Response, next : NextFunction) {
    console.log(res.locals._id)
    let results = await Producto.find({user_id:res.locals._id})

    res.json(results)
  }

  async obtenerProductoPorId(req : Request, res : Response) {
    const _id = req.params.id
    const producto = await Producto.findById({_id})
    res.json(producto);

  }
  async agregarProducto(req : Request, res : Response) {
    req.body.user_id= res.locals._id;
    console.log(res.locals._id)
    let producto = new Producto(req.body);
    let nuevoProducto = await producto.save()

    res.json({status: 200, resultado: nuevoProducto})
  }
  async modificar(req : Request, res : Response, next : NextFunction) {
    const body = req.body
    const _id = req.params.id

    await Producto.findOneAndUpdate({
      _id
    }, body)

    res.json({status: 200, resultado: body, message: `Registro actualizado: ${_id}`})
  }

  async eliminar(req : Request, res : Response, next : NextFunction) {
    const _id = req.params.id

    await Producto.remove({_id})

    res.json({status: 200, message: `Registro eliminado: ${_id}`})
  }

}