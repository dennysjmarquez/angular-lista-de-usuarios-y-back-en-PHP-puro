import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Usuario } from "../interfaces/usuario";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  serveURl: string = 'http://localhost/vacanteback1/';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any> {

    return this.http.get(this.serveURl);

  }

  getUsuario(id$: string): Observable<any> {

    return this.http.get(this.serveURl + '?usuario=' + id$ );

  }

  upDateUsuario(usuario: Usuario, id$: string): Observable<any> {

    const body = JSON.stringify(usuario);
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this.http.post(this.serveURl + '?update=' + id$, body, {headers});

  }

  borrarUsuario(id$: string){

    return this.http.get(this.serveURl + '?delete=' + id$);

  }

  nuevoUsuario(usuario: Usuario): Observable<any> {

    const body = JSON.stringify(usuario);
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this.http.post(this.serveURl + '?add', body, {headers});

  }

  correoExists(correo): Observable<any>{

    return this.http.get(this.serveURl + '?checkcorreo=' + correo );

  }

  cedulaExists(cedula): Observable<any>{

    return this.http.get(this.serveURl + '?checkcedula=' + cedula );

  }

}
