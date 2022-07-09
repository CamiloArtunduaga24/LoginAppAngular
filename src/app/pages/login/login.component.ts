import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginPage: UsuarioModel;

  constructor( private readonly auth:AuthService,
               private readonly router:Router ) { }

  ngOnInit() {

    this.loginPage = new UsuarioModel();
    
  }

  login( form:NgForm ) {

    if(form.invalid) { return; }
    swal("Entrando ...", "","success");

    // Swal.fire({
    //   title: 'Error!',
    //   text: 'Do you want to continue',
    //   icon: 'error',
    //   confirmButtonText: 'Cool'
    // });

    this.auth.login( this.loginPage ).subscribe(res => {
      console.log(res);
      swal.close();


      this.router.navigateByUrl('/home');
      
    }, (err) => {
      console.log(err.error.error.message);
      swal("Error al autenticar", "Failed", "error");
      
    });


  }

}
