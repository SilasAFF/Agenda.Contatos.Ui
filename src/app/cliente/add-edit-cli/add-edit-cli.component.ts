import { Component, OnInit, Input  } from '@angular/core';
import { Guid } from "guid-typescript";

import{SharedService} from 'src/app/shared.service';
import { Cliente } from '../Models/Cliente';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-cli',
  templateUrl: './add-edit-cli.component.html',
  styleUrls: ['./add-edit-cli.component.css']
})
export class AddEditCliComponent implements OnInit {

  @Input() cli:any;
  
  Id:Guid;
  Nome:string;
  //Idade:number;
  //Documento:string;
  Numero:string;
  Email:string;
  Favorito:boolean;
  

  cliente: Cliente;
  clienteForm: FormGroup;
  errors: any[] = [];

  constructor(private fb: FormBuilder,private router: Router,private service:SharedService) { }

  ngOnInit(): void {
    /*
    this.Id = (this.cli.Id == 0? Guid.create() : this.cli.Id);
    this.Nome = this.cli.Nome;
    this.Idade = this.cli.Idade;
    this.Documento = this.cli.Documento;
    this.Numero = this.cli.Numero;
    this.Email = this.cli.Email;
    */
    

if(this.cli.Id == 0){
  this.clienteForm = this.fb.group({
      
    nome: this.cli.Nome,//'',
    //idade: this.cli.Idade,//'',
    //documento: this.cli.Documento,//'',
    numero: this.cli.Numero,//'',
    email: this.cli.Email,//''
    favorito: this.cli.Favorito
    
  });
}
else{
  this.clienteForm = this.fb.group({
    id: this.cli.Id,
    nome: this.cli.Nome,//'',
    //idade: this.cli.Idade,//'',
    //documento: this.cli.Documento,//'',
    numero: this.cli.Numero,//'',
    email: this.cli.Email,//''
    favorito: this.cli.Favorito
    
  });
}
   


  }

  addCliente(){
    let clienteForm = Object.assign({}, this.cliente, this.clienteForm.value);
    
    this.clienteHandle(clienteForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  editCliente(){
    let clienteForm = Object.assign({}, this.cliente, this.clienteForm.value);
    
    this.editClienteHandle(clienteForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  onSaveComplete(response: any) {
    this.load()
  }

  onError(fail: any) {
   this.errors = fail.error.errors;
  }

  clienteHandle(cliente: Cliente): Observable<Cliente> {

    return this.service.addCliente(cliente);
  }
  editClienteHandle(cliente: Cliente): Observable<Cliente> {

    return this.service.editCliente(cliente);
  }

  load() {
    //Session storage salva os dados como string
    //(sessionStorage.refresh == 'true' || !sessionStorage.refresh) && 
    location.reload();
    //sessionStorage.refresh = false;
  }


}
