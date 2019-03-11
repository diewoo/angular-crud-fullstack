import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ApiService} from '../api.service';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
@Component({selector: 'app-producto-agregar',
 templateUrl: './producto-agregar.component.html', styleUrls: ['./producto-agregar.component.scss']})
export class ProductoAgregarComponent implements OnInit {
  productForm : FormGroup;
  prod_name : string = '';
  prod_desc : string = '';
  prod_price : number = null;
  isLoadingResults = false;
  constructor(private router : Router, private api : ApiService, 
    private formBuilder : FormBuilder) {}

  ngOnInit() {
    this.productForm = this
    .formBuilder
    .group({

      'prod_name': [
        null, Validators.required
      ],
      'prod_desc': [
        null, Validators.required
      ],
      'prod_price': [
        null, Validators.required
      ]
    });

  }

  

  onFormSubmit(form : NgForm) {
    this.isLoadingResults = true;
       this
      .api
      .AgregarProducto(form)
      .subscribe(res => {
        this.isLoadingResults = false;
        this.router.navigate(['/productos']);
      }, (err) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
