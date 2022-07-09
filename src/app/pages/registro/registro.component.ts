import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;


  constructor( private readonly auth:AuthService,
               private readonly router:Router  ) { }

  ngOnInit() { 
    this.usuario = new UsuarioModel();

  }

  onSubmit( form: NgForm ) {
  
    if( form.invalid ) {
      return;
    }

    swal("Usuario creado exitosamente", "","success");

    this.auth.nuevoUsuario( this.usuario ).subscribe(res => {
      console.log(res);
      swal.close();
      this.router.navigateByUrl('/home');
      
    }, (err) => {
      console.log(err.error.error.message);
      swal("Error al autenticar", "Failed", "error");
      
    })
    
    
    
  }


}
