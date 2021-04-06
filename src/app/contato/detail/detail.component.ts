import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { Endereco } from '../models/Endereco';

import {MatTableModule} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  //@Input()  
  enderecoList: any=[];
  endereco: Endereco;
  Id:Guid;
  ContatoId:Guid;
  Logradouro:string;
  Numero:string;
  Complemento:string;
  Cep:string;
  Bairro:string;
  Cidade:string;
  Estado:string;
  enderecoForm: FormGroup;
  errors: any[] = [];
  ActivateForm:boolean = false;
  ActivateModalForm:boolean = false;
  enderecoMap;
  enderecoCompleto;
  ModalTitle:string;

  displayedColumns: string[] = ['logradouro', 'numero', 'complemento', 'cep','bairro','cidade','estado','acao'];

  dataSource : any[] = [];
  isLoad: boolean = true;
  dt: any;
  dataDisplay: any;

  constructor(private fb: FormBuilder,private router: Router,private route: ActivatedRoute,private service:SharedService,private sanitizer: DomSanitizer,private http: HttpClient,private el: ElementRef) { 

  }


  ngOnInit(): void {

      //Loading
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

    
      // recarregamento dos dados na tela
      this.refreshList();

  }

  //mostrar modal (nao usado)
  showDialog(){
      let modal_t  = document.getElementById('exampleModal')
      modal_t.classList.remove('hhidden')
      modal_t.classList.add('sshow');
  }

  //fechar modal (nao usado)
  closeDialog() {
      let modal_t  = document.getElementById('exampleModal')
      modal_t.classList.remove('sshow')
      modal_t.classList.add('hhidden');
  }

  //fehcar modal (usado)
  closeClick(){
      this.ActivateModalForm=false;
    
  }

  //esconder load spiner
  hideloader() {
          
      // Setting display of spinner
      // element to none
      this.isLoad = false;
  }

  //recarregar dados
  refreshList(){

        let enderecoList = Object.assign({}, Guid, Guid.parse(this.route.snapshot.paramMap.get('contatoId')));
        
        this.refreshListHandle(Guid.parse(this.route.snapshot.paramMap.get('contatoId')))
            .subscribe(
              result => { this.onLoadComplete(result) },
                fail => { this.onError(fail) }
            );
      
  }

  refreshListHandle(contatoId: Guid): Observable<Endereco> {

      return this.service.getEnderecoList(contatoId);
  }

  //passando endereco completo para API Google Maps
  public EnderecoCompleto(resp:any):void{
      this.enderecoCompleto = resp.Logradouro+','+resp.Numero+'-'+resp.Bairro+','+resp.Cidade+'-'+resp.Estado;
      //return this.enderecoCompleto;
      //return "Rua,Numero-Bairro,Cidade-Estado";

      this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q="+this.enderecoCompleto+"&key=AIzaSyDfRHp_ym142NovJnM57gHdZ0U8yNssYyE");
  }

  //adicionando novo contato
  addClick(){
      this.ModalTitle="Cadastrar Endereço";
      this.ActivateModalForm = true;
      
  }

  //adicionando novo contato
  addEndereco(){

      let enderecoForm = Object.assign({}, this.endereco, this.enderecoForm.value);
      
      this.addEnderecoHandle(enderecoForm)
          .subscribe(
            result => { this.onSaveComplete(result) },
            fail => { this.onError(fail) }
          );
          
  }

  //adicionando novo contato
  addEnderecoHandle(endereco: Endereco): Observable<Endereco> {

      return this.service.addEndereco(endereco);
  }

  //atualizando contato
  editClick(){
      this.ModalTitle="Atualizar Endereço";
      this.ActivateModalForm = true;
  }

  //atualizando contato
  editEndereco(){
      let enderecoForm = Object.assign({}, this.endereco, this.enderecoForm.value);
      
      this.editEnderecoHandle(enderecoForm)
          .subscribe(
            result => { this.onSaveComplete(result) },
            fail => { this.onError(fail) }
          );
  }

  //atualizando contato
  editEnderecoHandle(endereco: Endereco): Observable<Endereco> {

      return this.service.editEndereco(endereco);
  }

  //deletando contato
  deleteClick(){

      let enderecoForm = Object.assign({}, this.endereco, this.enderecoForm.value);

      if(confirm("Tem certeza que deseja excluir o endereco?")){
        this.delEnderecoHandle(enderecoForm.id)
          .subscribe(
            result => { this.onSaveComplete(result) },
            fail => { this.onError(fail) }
        );
      }
  }

  //deletando contato
  delEnderecoHandle(id: Guid): Observable<Endereco> {

      return this.service.delEndereco(id);
  }

  //executado apos refreshList retornar sucesso
  //preencher Endereco Completo (se endereco ja cadastrado) e enderecoForm (para edição no formulario)
  onLoadComplete(response: any){

      if(response.Logradouro != null){
        this.dataSource = [
          {logradouro: response.Logradouro, numero: response.Numero,complemento: response.Complemento, cep: response.Cep, bairro: response.Bairro, cidade: response.Cidade, estado: response.Estado}
        ];

        this.EnderecoCompleto(response);

        //Para editar
        this.enderecoForm = this.fb.group({
          id:response.Id,
          contatoId: response.ContatoId,
          logradouro: response.Logradouro,
          numero:response.Numero,
          complemento: response.Complemento,
          cep: response.Cep,
          bairro: response.Bairro,
          cidade: response.Cidade,
          estado: response.Estado
        });

      }
      else{

        this.ActivateForm = true;

        //Para adicionar
          this.enderecoForm = this.fb.group({
            id: Guid.create().toString(),
            contatoId: this.route.snapshot.paramMap.get('contatoId'),
            logradouro: '',
            numero: '',
            complemento: '',
            cep: '',
            bairro: '',
            cidade: '',
            estado: ''
          });
      }
  }

  //executado apos add/edit retornar sucesso fazendo recarregamento da tela
  onSaveComplete(response: any) {
      this.load()
      // this.closeDialog();
      // this.refreshList();
      
  }

  //preenchiemnto do array de errors caso enviado pela API
  onError(fail: any) {
    this.errors = fail.error.errors;
  }

  load() {
      //Session storage salva os dados como string
      //(sessionStorage.refresh == 'true' || !sessionStorage.refresh) && 
      location.reload();
      //sessionStorage.refresh = false;
  }



}
