import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';

import{SharedService} from 'src/app/shared.service'; 
import { Contato } from '../models/Contato';
import { Endereco } from '../models/Endereco';

import {Router} from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';



@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  

  constructor(private fb: FormBuilder,private service:SharedService, private router: Router,private http: HttpClient,private snackBar: MatSnackBar) { 
    this.changeText = false;
  }

  favorito:boolean = false;
  ContatoList:any=[];
  ModalTitle:string;
  ActivateAddEditComp:boolean;
  ActivateDetComp:boolean = false;
  contato: Contato;
  contatoForm: FormGroup;
  endereco: any;
  isLoad: boolean = true;
  dt: any;
  dataDisplay: any;
  emailCopy:any;
  changeText: boolean;

  ngOnInit(): void {
    this.http.get(
      'http://www.mocky.io/v2/5ec6a61b3200005e00d75058')
                  .subscribe(Response => {
                        
                      // If Response comes function
                      // hideloader() is called
                      if (Response) {
                          this.hideloader();
                      }
                      console.log(Response)
                      this.dt = Response;
                      this.dataDisplay = this.dt.data;
                  });
              // Function is defined
        

    this.refreshList()
  }

  hideloader() {
        
    // Setting display of spinner
    // element to none
    this.isLoad = false;
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
      favorito: false,
      userId: null
      /*
      endereco:{
          id: null, 
          contatoId: null ,
          logradouro: '', 
          numero:'', 
          complemento:'',
          cep:'', 
          bairro:'', 
          cidade:'', 
          estado:''
        }
      */
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
      favorito: item.Favorito,
      userId: item.UserId
    /*
      endereco:{
        id: item.Id,
        contatoId: item.ContatoId,
        logradouro: item.Logradouro,
        numero: item.Numero,
        complemento: item.Id,
        cep: item.Id,
        bairro: item.Id,
        cidade: item.Id,
        estado: item.Id,
      }
    */
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
      favorito: !item.Favorito,
      userId: item.UserId
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

  detailClick(item){

    // this.service.getEnderecoList(item.Id).subscribe(data=>{
    //   this.endereco=data;
    // });


    if(this.endereco == null){
      this.endereco = {
        id: null,
        contatoId: item.Id,
        logradouro: 'Teste',
        numero:'',
        complemento:'',
        cep:'',
        bairro:'',
        cidade:'',
        estado:'' 
      }

      this.ModalTitle="Novo Endereco";
      this.ActivateDetComp=true;
        //this.router.navigate(['/detalhes', this.endereco.contatoId]);
    // }
    // else{
   this.router.navigate(['/detalhes', this.endereco.contatoId]);
     }
  }
  
  closeClick(){
    this.ActivateAddEditComp=false;
    this.refreshList();
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);

    // Abrindo popup snackBar
    let config = new MatSnackBarConfig();
    config.duration = 2000;
    config.horizontalPosition='center';
    config.panelClass = ['copy-email-snackbar'];
    this.snackBar.open("Email Copiado", val, config);
  }



}
