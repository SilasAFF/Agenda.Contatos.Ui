import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';

import{SharedService} from 'src/app/shared.service'; 
import { Contato } from '../models/Contato';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  constructor(private fb: FormBuilder,private service:SharedService) { }

  favorito:boolean = false;
  ContatoList:any=[];
  ModalTitle:string;
  ActivateAddEditComp:boolean;
  contato: Contato;
  contatoForm: FormGroup;

  ngOnInit(): void {
    this.refreshList()
  }

  refreshList(){
    this.service.getContatoList().subscribe(data=>{
      this.ContatoList=data;
    });
  }

  addClick(){
    this.contato={
      id: null,
      nome:'',
      numero:'',
      email:'',
      favorito: false
    }
    
    this.ModalTitle="Novo Contato";
    this.ActivateAddEditComp=true;
  }

  editClick(item){
    this.contato={
      id: item.Id,
      nome: item.Nome,
      numero: item.Numero,
      email: item.Email,
      favorito: item.Favorito
    }
    this.ModalTitle="Editar Contato";
    this.ActivateAddEditComp=true;
  }

  deleteClick(item){
    if(confirm("Tem certeza que deseja excluir "+item.Nome +" ?")){
      this.service.delContato(item.Id).subscribe(data=>{
        this.refreshList();
      });
    }
  }

  favoriteClick(item){
    this.contatoForm = this.fb.group({
      id: item.Id,
      nome: item.Nome,
      numero: item.Numero,
      email: item.Email,
      favorito: !item.Favorito
    });

    let contatoForm = Object.assign({}, this.contato, this.contatoForm.value);
    
    this.favoriteClienteHandle(contatoForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  favoriteClienteHandle(contato: Contato): Observable<Contato> {

    return this.service.editContato(contato);
  }

  onSaveComplete(response: any) {
    this.refreshList();
  }

  onError(fail: any) {
   //this.errors = fail.error.errors;
   alert("erro");
  }
  
  closeClick(){
    this.ActivateAddEditComp=false;
    this.refreshList();
  }

}
