import { Component, OnInit, Input  } from '@angular/core';
import { Guid } from "guid-typescript";
import{SharedService} from 'src/app/shared.service';
import { Contato } from '../models/Contato';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {

  @Input() contato: Contato;
  
  Id:Guid;
  Nome:string;
  Numero:string;
  Email:string;
  Favorito:boolean;
  UserId:String = localStorage.getItem('user');
  contatoForm: FormGroup;
  errors: any[] = [];

  constructor(private fb: FormBuilder,private router: Router,private service:SharedService) { }

  ngOnInit(): void {

    // Para adicionar
    if(this.contato.id == null){
      this.contatoForm = this.fb.group({
        id: Guid.create().toString(),
        nome: this.contato.nome,
        numero: this.contato.numero,
        email: this.contato.email,
        favorito: this.contato.favorito,
        userId: this.UserId
      });
    }

    // Para Atualizar
    else{
      this.contatoForm = this.fb.group({
        id: this.contato.id,
        nome: this.contato.nome,
        numero: this.contato.numero,
        email: this.contato.email,
        favorito: this.contato.favorito,
        userId: this.contato.userId
      });
    }
  }

  addContato(){
    let contatoForm = Object.assign({}, this.contato, this.contatoForm.value);
    
    this.addContatoHandle(contatoForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  editContato(){
    let contatoForm = Object.assign({}, this.contato, this.contatoForm.value);
    
    this.editContatoHandle(contatoForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
            fail => { this.onError(fail) }
        );
  }

  onSaveComplete(response: any) {
    this.load()
    //this.router.navigate(['contatos']);
  }

  onError(fail: any) {
    if(fail.status == 401){
      this.errors = ["Usuário não autorizado!","Realize o login ou cadastre-se."];
    }
    else{
      this.errors = fail.error.errors;
    }
   
  }

  addContatoHandle(contato: Contato): Observable<Contato> {

    return this.service.addContato(contato);
  }
  
  editContatoHandle(contato: Contato): Observable<Contato> {

    return this.service.editContato(contato);
  }

  load() {
    //Session storage salva os dados como string
    //(sessionStorage.refresh == 'true' || !sessionStorage.refresh) && 
    location.reload();
    //sessionStorage.refresh = false;
  }


}
