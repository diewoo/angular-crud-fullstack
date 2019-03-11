import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap, map} from 'rxjs/operators';
import {Producto} from './producto'
import {Usuario} from './usuario'
import {Router} from '@angular/router';
const tokens : any = JSON.parse(sessionStorage.getItem("tokens"))

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = ' http://localhost:3000/api/v1/productos';
const apiUrl2 = ' http://localhost:3000/api/v1/usuarios';

formData : Producto;
@Injectable({providedIn: 'root'})
export class ApiService {

  constructor(private http : HttpClient, private router : Router) {}

  private handleError < T > (operation = 'operation', result?: T) {
    return(error : any): Observable < T >=> {
      console.error(error);
      return of(result as T);
    }
  }

  obtenerProductos() : Observable < Producto[] > {
    if(sessionStorage.getItem("tokens")) {
      const tokens : any = JSON.parse(sessionStorage.getItem("tokens"))
      const headers = {
        "authorization": "bearer " + tokens.accessToken
      }
      return this.http.get < Producto[] > (apiUrl, {headers})

    }

  
  }

  obtenerProducto(id : number) : Observable < any > {
    const url = `${apiUrl}/${id}`;
    return this.http.get < Producto > (url).pipe(tap(_ => console.log(`producto obtenido id=${id}`)), catchError(this.handleError < Producto > (`obtenerProdcuto id=${id}`)));
  }

  AgregarProducto(producto) : Observable < Producto > {
    if(sessionStorage.getItem("tokens")) {
      const tokens : any = JSON.parse(sessionStorage.getItem("tokens"))
      const httpOptions2 = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          "authorization": "bearer " + tokens.accessToken
        })
      };
    return this.http.post < Producto > (apiUrl,producto, httpOptions2);
  }
  }
  ActualizarProducto(id, producto) : Observable < any > {
    const url = `${apiUrl}/${id}`;
    return this
      .http
      .put(url, producto, httpOptions)
      .pipe(tap(_ => console.log(`producto actualizado id=${id}`)), catchError(this.handleError < Producto > (`ActualizarProducto id=${id}`)))
  }

  eliminarProducto(id) : Observable < Producto > {
    const url = `${apiUrl}/${id}`;
    return this.http.delete < Producto > (url, httpOptions).pipe(tap(_ => console.log(`producto eliminado id=${id}`)), catchError(this.handleError < Producto > (`eliminarProducto id=${id}`)))
  }
  loguearse(usuario) : Observable < Usuario > {
    const url = `${apiUrl2}/login` 
    return this.http.post < Usuario > (url, usuario, httpOptions);
  }
  registrarse(usuario):Observable<Usuario>{
    const url = `${apiUrl2}/registro`
    console.log('aqui usuario:')
    console.log(usuario)
    return this.http.post < Usuario > (url, usuario, httpOptions);
  }

}
