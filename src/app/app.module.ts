import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SharedService } from './shared.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { ContatoComponent } from './contato/contato.component';
import { AddEditComponent } from './contato/add-edit/add-edit.component';
import { ShowComponent } from './contato/show/show.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DetailComponent } from './contato/detail/detail.component'

import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    AddEditComponent,
    ShowComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgxMaskModule.forRoot(),
    MatTableModule,
    MatMenuModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
