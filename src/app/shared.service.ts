import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import{ Contato } from './contato/models/Contato'
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Guid } from 'guid-typescript';
import { Endereco } from './contato/models/Endereco';
import { Registrar } from './contato/models/Registrar';
import { Login } from './contato/models/Login';


@Injectable()
export class SharedService {

  readonly APIUrl="http://localhost:5000/api";

  constructor(private http:HttpClient) { }

  public ObterHeaderFormData() {
    return {
        headers: new HttpHeaders({
            'Content-Disposition': 'form-data; name="contato"'
        })
    };
}

public ObterHeaderJson() {
  return {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('auth')
      })
  };
}

public extractData(response: any) {
  if(response.userId){
    localStorage.setItem('userId', response.userId);
  }
  if(response.userName){
    localStorage.setItem('userName', response.userName);
  }
  if(response.token){
    localStorage.setItem('auth', response.token);
  }

  return response.data || {};
}

public serviceError(response: Response | any) {
  let customError: string[] = [];

  if (response instanceof HttpErrorResponse) {

      if(response.statusText == "Unknown Error"){
        customError.push("Ocorreu um erro desconhecido");
        response.error.errors = customError
      }
  }

  console.error(response);
  return throwError(response);
}


//VERBOS---------------------------------------------------------------------------

//CONTATO: ------------------------------------------------------------------------

   getContatoList():Observable<Contato[]>{
    var auth = localStorage.getItem('auth');
    var userId = localStorage.getItem('userId');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.get<any>(this.APIUrl+'/contatos/'+userId.toString(), { headers: reqHeader });
  }

  addContato(contato: Contato): Observable<Contato>{
    var auth = localStorage.getItem('auth');
    var userId = localStorage.getItem('userId');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.post(this.APIUrl+'/contatos/'+userId.toString(), contato, { headers: reqHeader }/*this.ObterHeaderJson()*/)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }

  editContato(contato: Contato): Observable<Contato>{
    var auth = localStorage.getItem('auth');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.put(this.APIUrl+'/contatos/'+contato.userId+'/'+contato.id,contato, { headers: reqHeader }/*this.ObterHeaderJson()*/)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }
  
  delContato(id: Guid){
    var auth = localStorage.getItem('auth');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.delete(this.APIUrl+'/contatos/'+id, { headers: reqHeader } );
  }


  //ENDEREÇO: ------------------------------------------------------------------------

  getEnderecoList(contatoId: Guid):Observable<Endereco>{
    var auth = localStorage.getItem('auth');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.get<any>(this.APIUrl+'/enderecos/'+contatoId, { headers: reqHeader }/*this.ObterHeaderJson()*/)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
    );
  }

  addEndereco(endereco: Endereco): Observable<Endereco>{
    var auth = localStorage.getItem('auth');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.post(this.APIUrl+'/enderecos/'+endereco.contatoId,endereco, { headers: reqHeader }/*this.ObterHeaderJson()*/)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }

  editEndereco(endereco: Endereco): Observable<Endereco>{
    var auth = localStorage.getItem('auth');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.put(this.APIUrl+'/enderecos/'+endereco.id,endereco, { headers: reqHeader }/*this.ObterHeaderJson()*/)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }

  delEndereco(id: Guid){
    var auth = localStorage.getItem('auth');
    var reqHeader = new HttpHeaders({ 
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth
   });

    return this.http.delete(this.APIUrl+'/enderecos/'+id, { headers: reqHeader }/*this.ObterHeaderJson()*/)
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }


  //REGISTRAR: ------------------------------------------------------------------------

  addUser(registrar: Registrar): Observable<Registrar>{
    return this.http.post(this.APIUrl+'/nova-conta',registrar, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }

  //LOGAR: ------------------------------------------------------------------------

  loginUser(login: Login): Observable<Login>{
    return this.http.post(this.APIUrl+'/entrar',login, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }

}
