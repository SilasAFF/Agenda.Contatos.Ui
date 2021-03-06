import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { Guid } from "guid-typescript";
import{SharedService} from 'src/app/shared.service';
import { Contato } from '../models/Contato';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ShowComponent } from '../show/show.component';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  @ViewChild('myModalClose') modalClose;
  @Input() contato: Contato;
  
  Id:Guid;
  Nome:string;
  Numero:string;
  Email:string;
  Favorito:boolean;
  UserId:String = localStorage.getItem('user');
  PendenciaFinanceira: boolean;
  ValorPendente:string;
  contatoForm: FormGroup;
  errors: any[] = [];
  contatoCadastrado: boolean = false;
  contatoAtualizado: boolean = false;
  progress:number = 0;
  progressBarAtiva: boolean = false;
  adicionarContato: boolean;
  editarContato:boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:SharedService,
    private snackBar: MatSnackBar,
    private showComp: ShowComponent
    ) { }

  ngOnInit(): void {

    // Para adicionar
    if(this.contato.id == null){
      this.contatoForm = this.fb.group({
        id: Guid.create().toString(),
        nome: this.contato.nome,
        numero: this.contato.numero,
        email: this.contato.email,
        favorito: this.contato.favorito,
        userId: this.UserId,
        pendenciaFinanceira: this.contato.pendenciaFinanceira,
        valorPendente: this.contato.valorPendente
      });

      this.contatoForm.controls['valorPendente'].disable();
      this.adicionarContato = true;
    }

    // Para Atualizar
    else{
      this.contatoForm = this.fb.group({
        id: this.contato.id,
        nome: this.contato.nome,
        numero: this.contato.numero,
        email: this.contato.email,
        favorito: this.contato.favorito,
        userId: this.contato.userId,
        pendenciaFinanceira: this.contato.pendenciaFinanceira,
        valorPendente: this.contato.valorPendente
      });

      this.ValorPendente = this.contato.valorPendente;
      this.editarContato = true;
    }

  }

  addContato(){
    let contatoForm = Object.assign({}, this.contato, this.contatoForm.value);
    contatoForm.valorPendente = contatoForm.valorPendente + "";
    
    this.addContatoHandle(contatoForm)
        .subscribe(
          result => { this.onAddContatoSucess(result) },
          fail => { this.onError(fail) }
        );
  }

  addContatoHandle(contato: Contato): Observable<Contato> {

    return this.service.addContato(contato);
  }

  onAddContatoSucess(response: any) {

    this.errors =[];
    this.contatoCadastrado = true;

    this.progressBar();

    this.router.navigate(['contatos']).then(()=>{
      setTimeout(() => { //Depois de 2,5 segundos...

        //Habilitando campos depois da barra de progresso finalizada
        this.contatoForm.controls['nome'].enable();
        this.contatoForm.controls['numero'].enable();
        this.contatoForm.controls['email'].enable();
        this.contatoForm.controls['favorito'].enable();
        this.contatoForm.controls['pendenciaFinanceira'].enable();
        this.contatoForm.controls['valorPendente'].disable();

        
        //Reset form
        this.contatoForm = this.fb.group({
          id: Guid.create().toString(),
          nome: '',
          numero: '',
          email: '',
          favorito: false,
          userId: this.UserId,
          pendenciaFinanceira: false,
          valorPendente: ''
        });

        this.contatoCadastrado = false;
        this.progress = 0; //Zerando barra de progresso novamente
        this.progressBarAtiva = false;
      }, 2500);
    });
  }

  editContato(){
    let contatoForm = Object.assign({}, this.contato, this.contatoForm.value);
    if(!contatoForm.pendenciaFinanceira){
      contatoForm.valorPendente = null;
    }
    
    this.editContatoHandle(contatoForm)
        .subscribe(
          result => { this.onEditContatoSucess(result) },
            fail => { this.onError(fail) }
        );
  }

  editContatoHandle(contato: Contato): Observable<Contato> {

    return this.service.editContato(contato);
  }

  onEditContatoSucess(response: any) {

    this.errors =[];
    this.contatoAtualizado = true;
    this.progressBar();

    this.router.navigate(['contatos']).then(()=>{
      setTimeout(() => {//Depois de 2,5 segundos...

        //Habilitando campos depois da barra de progresso finalizada
        this.contatoForm.controls['nome'].enable();
        this.contatoForm.controls['numero'].enable();
        this.contatoForm.controls['email'].enable();
        this.contatoForm.controls['favorito'].enable();
        this.contatoForm.controls['pendenciaFinanceira'].enable();
        this.contatoForm.controls['valorPendente'].enable();



        //Preenche form com os dados rec??m editados
        let contatoFormAtualizado = Object.assign({}, this.contato, this.contatoForm.value)
        this.contatoForm = this.fb.group({
          id: contatoFormAtualizado.id,
          nome: contatoFormAtualizado.nome,
          numero: contatoFormAtualizado.numero,
          email: contatoFormAtualizado.email,
          favorito: contatoFormAtualizado.favorito,
          userId: contatoFormAtualizado.userId,
          pendenciaFinanceira: contatoFormAtualizado.pendenciaFinanceira,
          valorPendente: contatoFormAtualizado.valorPendente
        });
        this.contatoAtualizado = false;
        this.progress = 0;//Zerando barra de progresso novamente
        this.progressBarAtiva = false;
      }, 2500);
    });
  }

  progressBar(){
    if(this.progress <= 100)
    {
      this.progressBarAtiva = true;
      this.progress = this.progress +1;
      setTimeout(() => {
        this.progressBar()
      }, 20);

      //Desabilitando campos enquanto barra de progresso carrega
      this.contatoForm.controls['nome'].disable();
      this.contatoForm.controls['numero'].disable();
      this.contatoForm.controls['email'].disable();
      this.contatoForm.controls['favorito'].disable();
      this.contatoForm.controls['pendenciaFinanceira'].disable();
      this.contatoForm.controls['valorPendente'].disable();

    }
  }

  onError(fail: any) {
    this.contatoCadastrado = false;
    this.contatoAtualizado = false;

    if(fail.status == 401){
      this.errors = ["Usu??rio n??o autorizado!","Realize o login ou cadastre-se."];
    }
    else{
      this.errors = fail.error.errors;
    }
   
  }

  setContatoPendente(){
    if(this.adicionarContato){
      this.contato.pendenciaFinanceira = this.PendenciaFinanceira;
      this.PendenciaFinanceira = !this.contato.pendenciaFinanceira;
      if(this.PendenciaFinanceira){
        this.contatoForm.controls['valorPendente'].enable();
      }
      else{
        this.contatoForm.controls['valorPendente'].disable();
        this.contatoForm.controls['valorPendente'].setValue(null);
      }
    }
    else{
      this.contato.pendenciaFinanceira = !this.contato.pendenciaFinanceira;
      this.PendenciaFinanceira = this.contato.pendenciaFinanceira;
      if(this.PendenciaFinanceira){
        this.contatoForm.controls['valorPendente'].enable();
      }
      else{
        this.contatoForm.controls['valorPendente'].disable();
        this.contatoForm.controls['valorPendente'].setValue(null);
      }
    }
    

  }

}
