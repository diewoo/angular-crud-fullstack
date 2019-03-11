import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {pluck} from 'rxjs/operators'
import {ApiService} from '../api.service';

@Component({selector: 'app-login', templateUrl: './login.component.html', styleUrls: ['./login.component.scss']})
export class LoginComponent implements OnInit {
  grupo : FormGroup
  correo : string = '';
  contrasena : string = '';

  constructor(private api : ApiService, private router : Router) {}

  ngOnInit() {
    this.grupo = new FormGroup({
      correo: new FormControl(null, [Validators.required, Validators.email]),
      contrasena: new FormControl(null, Validators.required)
    })
  }

  onFormSubmit(form : NgForm) {
     this
      .api
      .loguearse(form)
      .pipe(pluck("tokens"))
      .subscribe(data => {
        console.log(data)
        sessionStorage.setItem("tokens", JSON.stringify(data))
        this
          .router
          .navigate(["/productos"])
      }, error => {
        console.log(error);

      });
  }

}
