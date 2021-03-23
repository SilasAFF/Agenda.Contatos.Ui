import { Component, OnInit, Input  } from '@angular/core';
import { Guid } from "guid-typescript";

import{SharedService} from 'src/app/shared.service';
import { Contato } from '../models/Contato';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxMaskModule, IConfig } from 'ngx-mask'

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  @Input() cli:any;
  
  Id:Guid;
  Nome:string;
  Numero:string;
  Email:string;
  Favorito:boolean;
  contato: Contato;

  
  contatoForm: FormGroup;
  errors: any[] = [];

  constructor(private fb: FormBuilder,private router: Router,private service:SharedService) { }

  ngOnInit(): void {

    

    if(this.cli.Id == 0){
      this.contatoForm = this.fb.group({
          
        nome: this.cli.Nome,//'',
        //idade: this.cli.Idade,//'',
        //documento: this.cli.Documento,//'',
        numero: this.cli.Numero,//'',
        email: this.cli.Email,//''
        favorito: this.cli.Favorito
        
      });
    }
    else{
      this.contatoForm = this.fb.group({
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
    let contatoForm = Object.assign({}, this.contato, this.contatoForm.value);
    
    this.clienteHandle(contatoForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  editCliente(){
    let contatoForm = Object.assign({}, this.contato, this.contatoForm.value);
    
    this.editClienteHandle(contatoForm)
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

  clienteHandle(contato: Contato): Observable<Contato> {

    return this.service.addCliente(contato);
  }
  editClienteHandle(contato: Contato): Observable<Contato> {

    return this.service.editCliente(contato);
  }

  load() {
    //Session storage salva os dados como string
    //(sessionStorage.refresh == 'true' || !sessionStorage.refresh) && 
    location.reload();
    //sessionStorage.refresh = false;
  }


}
