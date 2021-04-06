import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ContatoComponent } from './contato/contato.component';
import { DetailComponent } from './contato/detail/detail.component';

const routes: Routes = [
  {path:'contatos', component: ContatoComponent},
  {path:'detalhes/:contatoId', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
