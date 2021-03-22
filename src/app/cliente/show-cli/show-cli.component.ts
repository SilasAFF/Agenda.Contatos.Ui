import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';

import{SharedService} from 'src/app/shared.service'; 
import { Cliente } from '../Models/Cliente';

@Component({
  selector: 'app-show-cli',
  templateUrl: './show-cli.component.html',
  styleUrls: ['./show-cli.component.css']
})
export class ShowCliComponent implements OnInit {

  constructor(private fb: FormBuilder,private service:SharedService) { }

  favorito:boolean = false;

  ClienteList:any=[];
  
  ModalTitle:string;
  ActivateAddEditCliComp:boolean;
  cli:any;
  cliente: Cliente;
  clienteForm: FormGroup;

  ngOnInit(): void {
    this.refreshCliList()
  }

  refreshCliList(){
    this.service.getCliList().subscribe(data=>{
      this.ClienteList=data;
    });
    if(this.ClienteList.lenght() < 1){
      
    }
  }

  addClick(){
    this.cli={
      Id:0,
      Nome:'',
      //Idade:0,
      //Documento:'',
      Numero:'',
      Email:'',
      Favorito: false
    }
    this.ModalTitle="Add Cliente";
    this.ActivateAddEditCliComp=true;
  }

  closeClick(){
    this.ActivateAddEditCliComp=false;
    this.refreshCliList();
  }

  editClick(item){
    this.cli=item;
    this.ModalTitle="Edit Cliente";
    this.ActivateAddEditCliComp=true;
  }

  deleteClick(item){
    if(confirm("Tem Certeza?")){
      this.service.delCliente(item).subscribe(data=>{
        this.refreshCliList();
      });
    }
  }


  favoriteCliente(item){
    this.clienteForm = this.fb.group({
      id: item.Id,
      nome: item.Nome,
      numero: item.Numero,
      email: item.Email,
      favorito: !item.Favorito
    });

    let clienteForm = Object.assign({}, this.cliente, this.clienteForm.value);
    
    this.favoriteClienteHandle(clienteForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  favoriteClienteHandle(cliente: Cliente): Observable<Cliente> {

    return this.service.editCliente(cliente);
  }

  onSaveComplete(response: any) {
    this.load()
  }

  onError(fail: any) {
   //this.errors = fail.error.errors;
   alert("erro");
  }


  load() {
    //Session storage salva os dados como string
    //(sessionStorage.refresh == 'true' || !sessionStorage.refresh) && 
    location.reload();
    //sessionStorage.refresh = false;
  }

}
