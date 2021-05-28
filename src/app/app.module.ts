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
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { HomeComponent } from './home/home.component';
import { RegistrarComponent } from './home/registrar/registrar.component';
import { LoginComponent } from './home/login/login.component';
import { AgendaComponent } from './agenda/agenda.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import  dayGridPlugin  from "@fullcalendar/daygrid";
import  interactionPlugin  from "@fullcalendar/interaction";
import { PendanciaFinanceiraComponent } from './pendancia-financeira/pendancia-financeira.component';
import { CurrencyMaskModule } from "ng2-currency-mask";


FullCalendarModule.registerPlugins([
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    ContatoComponent,
    AddEditComponent,
    ShowComponent,
    DetailComponent,
    HomeComponent,
    RegistrarComponent,
    LoginComponent,
    AgendaComponent,
    PendanciaFinanceiraComponent
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
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
    FullCalendarModule,
    CurrencyMaskModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
