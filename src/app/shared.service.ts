import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpHeaders } from '@angular/common/http';
import{ Cliente } from './cliente/Models/Cliente'
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
            'Content-Disposition': 'form-data; name="cliente"'
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


/*
public serviceError(error: Response | any) {
  let errMsg: string;

  if (error instanceof Response) {

      errMsg = `${error.status} - ${error.statusText || ''}`;
  }
  else {
      errMsg = error.message ? error.message : error.toString();
  }

  console.error(errMsg);
  return throwError(errMsg);
}*/

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

   getCliList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/contatos');
  }

  
  addCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.post(this.APIUrl+'/contatos',cliente, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }

  editCliente(cliente: Cliente): Observable<Cliente>{
    return this.http.put(this.APIUrl+'/contatos/'+cliente.id,cliente, this.ObterHeaderJson())
    .pipe(
      map(this.extractData),
      catchError(this.serviceError)
  );
  }
  
  delCliente(id: Guid){
    return this.http.delete(this.APIUrl+'/contatos/'+id);
  }

}
