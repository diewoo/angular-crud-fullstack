import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Producto} from '../producto';
import {ApiService} from '../api.service';

@Component({selector: 'app-producto-detalle', templateUrl: './producto-detalle.component.html', styleUrls: ['./producto-detalle.component.scss']})
export class ProductoDetalleComponent implements OnInit {
  producto : Producto = {
    id: null,
    prod_name: '',
    prod_desc: '',
    prod_price: null,
    updated_at: null
  }
  isLoadingResults = true;

  constructor(private route : ActivatedRoute, private api : ApiService, private router : Router) {}

  ngOnInit() {
    this.ObtenerDetalleProducto(this.route.snapshot.params['id']);
  }
  ObtenerDetalleProducto(id) {
    this
      .api
      .obtenerProducto(id)
      .subscribe(data => {
        this.producto = data;
        console.log(this.producto);
        this.isLoadingResults = false;
      });
  }
  eliminarProducto(id) {
    this.isLoadingResults = true;
    this
      .api
      .eliminarProducto(id)
      .subscribe(res => {
        this.isLoadingResults = false;
        this
          .router
          .navigate(['/productos']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
