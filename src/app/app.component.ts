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


  
  constructor(private router: Router) { }
  ngOnInit(): void {
    
   
  }

  homeClick(){
    this.router.navigate(['/contatos']);
  }

}


