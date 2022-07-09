import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://identitytoolkit.googleapis.com/v1/accounts:';

  private apiKey = 'AIzaSyDwUtACz7c2wBBJNSUrTnrCq8KmnQxx858';

  userToken: string;

  //Crear nuevo usuario

  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  //Login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor( private readonly http: HttpClient ) { 
    this.leerToken();
  }


  logout() {

    

  }

  login( usuario:UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(`${ this.URL }signInWithPassword?key=${ this.apiKey }`, authData )
                         .pipe( map( res => {
                           console.log('entro en el map del RXJS');
                             this.guardarToken( res['idToken'] );
                             return res;
                         }));

  }

  nuevoUsuario( usuario:UsuarioModel ) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };


    return this.http.post(`${ this.URL }signUp?key=${ this.apiKey }`, authData )
                          .pipe( map( res => {
                            console.log('entro en el map del RXJS');
                              this.guardarToken( res['idToken'] );
                              return res;
                          }));

  }

  private guardarToken( idToken:string ) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if(localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else {
      this.userToken = '';
    }

    return this.userToken;
  }
}
