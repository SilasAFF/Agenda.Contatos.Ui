import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contato } from '../contato/models/Contato';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-pendancia-financeira',
  templateUrl: './pendancia-financeira.component.html',
  styleUrls: ['./pendancia-financeira.component.css']
})
export class PendanciaFinanceiraComponent implements OnInit {

  constructor(
    private service:SharedService, 
    private router: Router,
    private http: HttpClient
  ) { }


  favorito:boolean = false;
  ContatoPendenciaFinanceiraList:any=[];
  ModalTitle:string;
  ActivateAddEditComp:boolean;
  ActivateDetComp:boolean = false;
  contato: Contato;
  endereco: any;
  isLoad: boolean = true;
  dt: any;
  dataDisplay: any;
  emailCopy:any;
  changeText: boolean;

  ngOnInit(): void {

    this.http.get(
      'http://www.mocky.io/v2/5ec6a61b3200005e00d75058')
                  .subscribe(Response => {
                        
                      // If Response comes function
                      // hideloader() is called
                      if (Response) {
                          this.hideloader();
                      }
                      console.log(Response)
                      this.dt = Response;
                      this.dataDisplay = this.dt.data;
                  });
              // Function is defined

    this.refreshList()
  }

  hideloader() {
        
    // Setting display of spinner
    // element to none
    this.isLoad = false;
  }

  refreshList(){
    this.service.getContatoPendenciaFinanceiraList().subscribe(data=>{
      this.ContatoPendenciaFinanceiraList=data;
    });
  }

  homeClick(){
    this.router.navigate(['/contatos']);
  }

}
