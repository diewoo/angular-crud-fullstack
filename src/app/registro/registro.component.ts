import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {first} from 'rxjs/operators';
import {ApiService} from '../api.service';
import {FormGroup, FormControl, Validators, NgForm, FormBuilder} from '@angular/forms';
@Component({selector: 'app-registro', templateUrl: './registro.component.html', styleUrls: ['./registro.component.scss']})
export class RegistroComponent implements OnInit {
  registerForm : FormGroup;
  nombre : string = '';
  apellido : string = '';
  correo : string = '';
  contrasena : string = '';
  isLoadingResults = false;
  constructor(private formBuilder :
     FormBuilder, 
     private router : Router,
      private api : ApiService) {}

  ngOnInit()
  {
    this.registerForm = this
      .formBuilder
      .group({
        'nombre': [
          null, Validators.required
        ],
        'apellido': [
          null, Validators.required
        ],
        'correo': [
          null, Validators.required
        ],
        'contrasena': [
          null,
          
            Validators.required
          
        ]
      });
  }

  onFormSubmit(form : NgForm) {
    this.isLoadingResults = true;

    
    
    this
      .api
      .registrarse(form)
      .subscribe(data => {
        console.log(data)
        this.isLoadingResults = false;
        this
          .router
          .navigate(['/login']);
      }, error => {
        console.log('con fe')
        console.log(error)
        this.isLoadingResults = false;
      });
  }
}
