import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import{ Contato } from './contato/models/Contato'
import { catchError, map } from "rxjs/operators";
import { throwError } from 'rxjs';
import { Guid } from 'guid-typescript';
/*
@Injectable({
  providedIn: 'root'
})
*/
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
          'Content-Type': 'application/json'
      })
  };
}

public extractData(response: any) {
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


//VERBOS------------------------------------------------------------------------

   getContatoList():Observable<Contato[]>{
    return this.http.get<any>(this.APIUrl+'/contatos');
  }

  addContato(contato: Contato): Observable<Contato>{
    return this.http.post(this.APIUrl+'/contatos',contato, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }

  editContato(contato: Contato): Observable<Contato>{
    return this.http.put(this.APIUrl+'/contatos/'+contato.id,contato, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }
  
  delContato(id: Guid){
    return this.http.delete(this.APIUrl+'/contatos/'+id);
  }

}
