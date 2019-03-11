import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProductosComponent} from './productos/productos.component';
import { ProductoDetalleComponent } from './producto-detalle/producto-detalle.component';
import { ProductoAgregarComponent } from './producto-agregar/producto-agregar.component';
import { ProductoEditarComponent } from './producto-editar/producto-editar.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

const routes : Routes = [
  {
    path: 'productos',
    component: ProductosComponent,
    data: {
      titulo: 'Lista de productos'
    }
  },
  {
    path:'login',
    component:LoginComponent,
    data:{
      titulo:'Login'
    }
  },
  {
    path:'producto-detalle/:id',
    component:ProductoDetalleComponent,
    data:{
      titulo:'Detalle del producto'
    }
  },
  {
    path:'registro',
    component:RegistroComponent,
    data:{
      titulo:'Registro'
    }
  },
  {
    path:'producto-agregar',
    component:ProductoAgregarComponent,
    data:{
      titulo:'Agregar producto'
    }
  },
  {
    path:'producto-editar/:id',
    component:ProductoEditarComponent,
    data:{
      titulo:'Editar producto'
    }
  },
  {
    path:'',
    redirectTo:'/login',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}