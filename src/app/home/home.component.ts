import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    //Se usuário logado redireciona para tela de Contatos
    if(localStorage.getItem('userName') !="null" && localStorage.getItem('userName') != null){
      this.router.navigate(['contatos']);
    }
  }

  registrarClick(){
    this.router.navigate(['registrar']);
  }

  loginClick(){
    this.router.navigate(['login']);
  }

}
