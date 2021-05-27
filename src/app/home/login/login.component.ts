import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Login } from 'src/app/contato/models/Login';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //@Input() 
  login: Login;
  Email:string;
  Senha:string;
  loginForm: FormGroup;
  errors: any[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service:SharedService,
    private appComp: AppComponent) { }

  ngOnInit(): void {
    //Se usuário logado redireciona para tela de Contatos
    if(localStorage.getItem('userName') !="null" && localStorage.getItem('userName') != null){
      this.router.navigate(['contatos']);
    }

    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
     });
  }

  onSubmit() {
    this.submitted = true;
    let loginForm = Object.assign({}, this.login, this.loginForm.value);
    
    this.logarUsuarioHandle(loginForm)
        .subscribe(
          result => { this.onSaveComplete(result) },
          fail => { this.onError(fail) }
        );
  }

  logarUsuarioHandle(login: Login): Observable<Login> {

    return this.service.loginUser(login);
  }

  onSaveComplete(response: any) {
    //location.reload();
    this.appComp.mostraSaudacao();
    this.router.navigate(['contatos']);
  }

  onError(fail: any) {
   this.errors = fail.error.errors;
  }

}