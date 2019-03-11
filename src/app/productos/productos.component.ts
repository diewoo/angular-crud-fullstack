import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import {Producto} from '../producto';
import {Router} from '@angular/router'
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  displayedColumn :string []=['prod_name','prod_desc','prod_price',
'updated_at'];
  data:Producto[]=[];
  
  isLoadingResults=true;

  constructor(private api:ApiService
    ,private router:Router) { }

  ngOnInit() {
    this.api.obtenerProductos()
    .subscribe(res=>{
      this.data=res;
     // console.log(this.data);
      this.isLoadingResults=false;

    },err=>{
      this
          .router
          .navigate(["/login"])
      console.log(err);
      this.isLoadingResults=false;
    }
    )
  }

}
