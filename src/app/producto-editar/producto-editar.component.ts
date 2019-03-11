import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApiService} from '../api.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
@Component({selector: 'app-producto-editar', templateUrl: './producto-editar.component.html', styleUrls: ['./producto-editar.component.scss']})
export class ProductoEditarComponent implements OnInit {
  productForm : FormGroup;
  _id : string = '';
  prod_name : string = '';
  prod_desc : string = '';
  prod_price : number = null;
  isLoadingResults = false;
  constructor(private router : Router, private route : ActivatedRoute, private api : ApiService, private formBuilder : FormBuilder) {}

  ngOnInit() {
    this.obtenerProducto(this.route.snapshot.params['id']);

    this.productForm = this
      .formBuilder
      .group({
        'prod_name': [
          null, Validators.required
        ],
        'prod_desc': [
          null, Validators.required
        ],
        'prod_price': [null, Validators.required]
      });
  }
  obtenerProducto(id) {
    this
      .api
      .obtenerProducto(id)
      .subscribe(data => {
        this._id = data._id;
        this
          .productForm
          .setValue({prod_name: data.prod_name, prod_desc: data.prod_desc, prod_price: data.prod_price});
      });
  }
  onFormSubmit(form : NgForm) {
    this.isLoadingResults = true;
    this
      .api
      .ActualizarProducto(this._id, form)
      .subscribe(res => {
        this.isLoadingResults = false;
        this
          .router
          .navigate(['/producto-detalle', this._id]);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  productDetails() {
    this
      .router
      .navigate(['/producto-detalle', this._id]);
  }

}
