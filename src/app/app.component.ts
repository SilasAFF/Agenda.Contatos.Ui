import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { IsLoadingService } from '@service-work/is-loading';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Agenda-Contatos-Ui';

  UserName : String = "";
  
  constructor(private router: Router) { 

  }
  ngOnInit(): void {

      //this.UserName = localStorage.getItem('userName');

      /*if(this.UserName == null){
        localStorage.setItem('userId', null);
        localStorage.setItem('userName', null);
        localStorage.setItem('auth', null);
      }*/

      this.mostraLogarRegistrar()
      this.mostraSaudacao();
  }

  homeClick(){
    this.router.navigate(['/contatos']);
  }

  logoutClick(){
    this.limpaDadosUsuario();
    this.mostraLogarRegistrar();
    //location.reload();
    this.router.navigate(['/home']);
  }

  mostraSaudacao() : boolean{
    this.UserName = localStorage.getItem('userName');

    if(this.UserName != null && this.UserName != "null"){
      this.UserName = localStorage.getItem('userName').substring(0,localStorage.getItem('userName').indexOf("@"));
      return true;
    }
      
      return false;
  }

  mostraLogarRegistrar() : boolean{
    this.UserName = localStorage.getItem('userName');

    if(this.UserName != null && this.UserName != "null")
      return false;
    
      return true;
  }

  registrarClick(){
    this.router.navigate(['registrar']);
  }
 
  loginClick(){
    this.router.navigate(['login']);
  }

  limpaDadosUsuario(){
    localStorage.clear();
    /*
    localStorage.setItem('userId', null);
    localStorage.setItem('userName', null);
    localStorage.setItem('auth', null);
    */
  }


}


