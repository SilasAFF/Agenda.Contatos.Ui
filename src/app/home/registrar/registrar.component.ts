import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Registrar } from 'src/app/contato/models/Registrar';
import { SharedService } from 'src/app/shared.service';

import { MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {

  //@Input() 
  registrar: Registrar;
  Email:string;
  Senha:string;
  ConfirmarSenha: string;
  registrarForm: FormGroup;
  errors: any[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:SharedService,
    private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    //Se usuário logado redireciona para tela de Contatos
    if(localStorage.getItem('userName') !="null" && localStorage.getItem('userName') != null){
      this.router.navigate(['contatos']);
    }

    this.registrarForm = this.fb.group({
      email: [''],
      password: [''],
      confirmPassword: [''],
    });
  }

  onSubmit() {
    this.submitted = true;
    let registrarForm = Object.assign({}, this.registrar, this.registrarForm.value);
    
    this.addUsuarioHandle(registrarForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  addUsuarioHandle(registrar: Registrar): Observable<Registrar> {

    return this.service.addUser(registrar);
  }

  onSaveComplete(response: any) {
    this.router.navigate(['home']);
    
    // Abrindo popup snackBar
    let config = new MatSnackBarConfig();
    config.duration = 4000;
    config.panelClass = ['register-snackbar'];
    this.snackBar.open("Usuário Cadastrado","✔", config);
  }
  
  onError(fail: any) {
   this.errors = fail.error.errors;
  }

}
