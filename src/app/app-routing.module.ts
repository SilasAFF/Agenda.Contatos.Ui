import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaComponent } from './agenda/agenda.component';
import { ContatoComponent } from './contato/contato.component';
import { DetailComponent } from './contato/detail/detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './home/login/login.component';
import { RegistrarComponent } from './home/registrar/registrar.component';

const routes: Routes = [
  //Redireciona para Home caso url vazia
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path:'home', component: HomeComponent},
  {path:'registrar', component: RegistrarComponent},
  {path:'login', component: LoginComponent},
  {path:'contatos', component: ContatoComponent},
  {path:'detalhes/:contatoId', component: DetailComponent},
  {path:'agenda', component: AgendaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
