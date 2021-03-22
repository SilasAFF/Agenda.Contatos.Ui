import { Component, OnInit } from '@angular/core';
//import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

//enderecoMap;

  constructor( /*private route: ActivatedRoute, private sanitizer: DomSanitizer*/) {
    //this.enderecoMap = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com/maps/embed/v1/place?q="+this.EnderecoCompleto()+"&key=AIzaSyDfRHp_ym142NovJnM57gHdZ0U8yNssYyE");
   }

  ngOnInit(): void {
  }

  /*
public EnderecoCompleto():string{
  return "Rua,Numero-Bairro,Cidade-Estado";
}*/

}
