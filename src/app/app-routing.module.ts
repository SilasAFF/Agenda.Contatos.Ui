import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContatoComponent } from './contato/contato.component';
import { DetailComponent } from './contato/detail/detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrarComponent } from './home/registrar/registrar.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'registrar', component: RegistrarComponent},
  {path:'login', component: LoginComponent},
  {path:'contatos', component: ContatoComponent},
  {path:'detalhes/:contatoId', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
