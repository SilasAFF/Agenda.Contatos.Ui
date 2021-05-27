import { Component, ElementRef, Input, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid'; 
import { Calendar, CalendarOptions } from '@fullcalendar/angular';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agenda } from '../contato/models/Agenda';
import { Guid } from 'guid-typescript';
import { SharedService } from '../shared.service';
import { HttpClient } from '@angular/common/http';
import { ShowComponent } from '../contato/show/show.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css']
})
export class AgendaComponent implements OnInit {

  @Input() agenda: Agenda;
  ContatoList:any=[];
  AgendaList: any=[];
  Id:Guid;
  NomeEvento:string;
  Inicio:string;
  Fim:string;
  ContatoId:Guid;
  agendaForm: FormGroup;
  errors: any[] = [];
  ActivateForm:boolean = false;
  ActivateModalForm:boolean = false;
  ModalTitle:string;
  displayedColumns: string[] = ['nomeEvento', 'descricaoEvento', 'inicioEvento', 'fimEvento'];
  dataSource : any[]; //= [{title: 'Compromisso 1', date: '2021-05-01'}];
  isLoad: boolean = true;
  dt: any;
  dataDisplay: any;
  calendarOptions: CalendarOptions;

  agendaCadastrada: boolean = false;
  agendaAtualizada: boolean = false;
  progress:number = 0;
  progressBarAtiva: boolean = false;

  editarAtivo: boolean = false;
  cadastrarAtivo: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service:SharedService,
    private http: HttpClient,
    private el: ElementRef
    ) { }

  ngOnInit(): void {
    this.refreshContatoList();
    this.refreshAgendaList();

        this.agendaForm = this.fb.group({
          id: Guid.create().toString(),
          nomeEvento: '',
          descricaoEvento: '',
          inicioEvento: '',
          fimEvento: '',
          contatoId: '',
          userId: ''
        });

  }
 
  /*
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [
      
      // { title: 'Compromisso 1', date: '2021-05-01' },
      // { title: 'Reunião 2', date: '2021-05-02' },
      // {
      //   title: 'Compromisso 3',
      //   start: '2021-05-12T14:30:00',
      //   end: '2021-05-14T16:30:00',
      //   extendedProps: {
      //     department: 'Tecnologia'
      //   },
      //   description: 'Reunião de alinhamento'
      // }
      
      this.dataSource
    ],

    //EVENTO CLICK 02
    //eventClick: this.handleEventClick.bind(this)

    //EVENTO CLICK 01
    // eventClick: function(info) {
    //   alert('Event: ' + info.event.title);
    //   this.funcaoDoida();
    //   // alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    //   // alert('View: ' + info.view.type);

    //   // change the border color just for fun
    //   info.el.style.borderColor = 'red';
    // }

  };
  */

  handleEventClick(arg) {

      Swal.fire({
        title:'<span style="font-weight:bold">'+arg.event._def.title+'</span>',
        html:
            arg.event.start.getHours() +':'+ ('0'+arg.event.start.getMinutes()).substr(('0'+arg.event.start.getMinutes()).length - 2) + 
            ' - '+
            arg.event.end.getHours() +':'+ ('0'+arg.event.end.getMinutes()).substr(('0'+arg.event.end.getMinutes()).length - 2) +
            '<hr>'+
            '<span style="font-weight:bold">Descrição:</span>'+
            '<br/>'+
            arg.event._def.extendedProps.description +
            '<br/>'+
            '<br/>'+ 
            '<span style="font-weight:bold">Participante:</span>'+
            '<br/>'+
            arg.event._def.extendedProps.contact,

        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:'Excluir Evento',
        cancelButtonText: 'Editar Evento'
      }).then((result) => {
        if (result.value) {
          
                Swal.fire({
                  title:'<span style="font-weight:bold">'+"Tem certeza?"+'</span>',
                  text: "Você realmente quer excluir o evento?",
                  icon: 'warning',
                  showCloseButton: true,
                  showCancelButton: true,
                  confirmButtonText:'Sim',
                  cancelButtonText: 'Não'
                }).then((result) => {
                    if (result.value) {
                      this.delAgendaClick(arg)
                    }
                    else if (result.dismiss === Swal.DismissReason.cancel) {
                      Swal.fire(
                        'Cancelado',
                        'Exclusão cancelada',
                        'info'
                      )
                    }
                  })
          
        } else if (result.dismiss === Swal.DismissReason.cancel) {


          this.editAgendaClick(arg)

          //Chama a função novamente, porque só abre o modal de edição na segunda vez que chama o "editAgendaClick"
          setTimeout(() => { this.editAgendaClick(arg)}, 200);

        }
      })
  }

  addAgendaClick(){
    this.ModalTitle="Cadastrar Agenda";
    this.ActivateModalForm = true;
    this.cadastrarAtivo = true;
    this.editarAtivo = false;
  }

  editAgendaClick(param){

    this.ModalTitle="Editar Agenda";
    this.ActivateModalForm = true;
    this.cadastrarAtivo = false;
    this.editarAtivo = true;

    let dataInicio = param.event.start;
    dataInicio.setHours(dataInicio.getHours() - 3);

    let dataFim = param.event.end;
    dataFim.setHours(dataFim.getHours() - 3);

    //let teste = param.event.start.getHours() +':'+ ('0'+param.event.start.getMinutes()).substr(('0'+param.event.start.getMinutes()).length - 2)
 

    //Edit form
    this.agendaForm = this.fb.group({
      id: param.event._def.publicId.toString(),
      nomeEvento: param.event._def.title,
      descricaoEvento: param.event._def.extendedProps.description,
      inicioEvento: dataInicio.toISOString().replace("Z",""),
      fimEvento: dataFim.toISOString().replace("Z",""),
      contatoId: param.event._def.extendedProps.contactId,
      userId: param.event._def.extendedProps.userId
    });
    
    document.getElementById("btnAtualizarEvento").click();
  
  
    /*
  const modal = document.getElementById('exampleModal');
  modal.setAttribute("aria-hidden","false");
  modal.setAttribute("data-toggle","modal");
  modal.setAttribute("data-target","#exampleModal");

  const main = document.getElementById('main');    
  const modalEl = document.createElement('div');*/
  }
  
  closeClick(){
    this.ActivateModalForm=false;
    this.refreshAgendaList();

    //Reset form
    this.agendaForm = this.fb.group({
      id: Guid.create().toString(),
      nomeEvento: '',
      descricaoEvento: '',
      inicioEvento: '',
      fimEvento: '',
      contatoId: '',
      userId: ''
    });
  }

  refreshContatoList(){
    this.service.getContatoList().subscribe(data=>{
      this.ContatoList=data;
    });
  }

  refreshAgendaList(){

    this.refreshAgendaListHandle()
            .subscribe(
              result => { this.onLoadAgendaListComplete(result) },
                fail => { this.onError(fail) }
            );

    /*
    this.service.getAgendaList().subscribe(data=>{
      this.AgendaList=data;
    });
    */
  }

  refreshAgendaListHandle(): Observable<Agenda[]>{
    return this.service.getAgendaList();
  }
  
  onLoadAgendaListComplete(response: any[]){

    let eventos = [];
      
        response.forEach(data => {
         eventos.push({title: data.NomeEvento, 
                          start: data.inicioEvento,
                          end: data.FimEvento,
                          description: data.DescricaoEvento,
                          contact: data.Contato.Nome,
                          contactId: data.ContatoId,
                          id: data.Id,
                          userId: data.UserId
                        });
        })

      
    
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: eventos,
        eventColor:'rgb(29, 29, 29)',
        eventClick: this.handleEventClick.bind(this)
      };
  }

   //adicionando nova Agenda
   addAgenda(){

    let agendaForm = Object.assign({}, this.agenda, this.agendaForm.value);
    
    this.addAgendaHandle(agendaForm)
        .subscribe(
          result => { this.onAddAgendaSucess(result) },
          fail => { this.onError(fail) }
        );
        
}

//adicionando nova Agenda

addAgendaHandle(agenda: Agenda): Observable<Agenda> {

    return this.service.addAgenda(agenda);
}

onAddAgendaSucess(response: any) {
    //location.reload();
    //this.refreshAgendaList();
    
    this.errors =[];
    this.agendaCadastrada = true;

    //Set time pra chamar a função por causa do delay no progressBar
    setTimeout(() => {
      this.progressBar()
    }, 100);

    //this.progressBar();

    this.router.navigate(['agenda']).then(()=>{
      setTimeout(() => { //Depois de 2,5 segundos...

        //this.refreshAgendaList();

        //Habilitando campos depois da barra de progresso finalizada
        this.agendaForm.controls['nomeEvento'].enable();
        this.agendaForm.controls['descricaoEvento'].enable();
        this.agendaForm.controls['inicioEvento'].enable();
        this.agendaForm.controls['fimEvento'].enable();
        this.agendaForm.controls['contatoId'].enable();
        
        //Reset form
        this.agendaForm = this.fb.group({
          id: Guid.create().toString(),
          nomeEvento: '',
          descricaoEvento: '',
          inicioEvento: '',
          fimEvento: '',
          contatoId: '',
          userId: ''
        });

        this.agendaCadastrada = false;
        this.progress = 0; //Zerando barra de progresso novamente
        this.progressBarAtiva = false;
      }, 2500);
    });

    
}

  //atualizando Agenda
  editAgenda(){

    let agendaForm = Object.assign({}, this.agenda, this.agendaForm.value);
    
    this.editAgendaHandle(agendaForm)
        .subscribe(
          result => { this.onEditAgendaSucess(result) },
          fail => { this.onError(fail) }
        );
        
}

editAgendaHandle(agenda: Agenda): Observable<Agenda> {

  return this.service.editAgenda(agenda);
}

onEditAgendaSucess(response: any) {
  //location.reload();
  //this.refreshAgendaList();
  
  this.errors =[];
  this.agendaAtualizada = true;

  //Set time pra chamar a função por causa do delay no progressBar
  setTimeout(() => {
    this.progressBar()
  }, 100);

  //this.progressBar();

  this.router.navigate(['agenda']).then(()=>{
    setTimeout(() => { //Depois de 2,5 segundos...

      //this.refreshAgendaList();

      //Habilitando campos depois da barra de progresso finalizada
      this.agendaForm.controls['nomeEvento'].enable();
      this.agendaForm.controls['descricaoEvento'].enable();
      this.agendaForm.controls['inicioEvento'].enable();
      this.agendaForm.controls['fimEvento'].enable();
      this.agendaForm.controls['contatoId'].enable();
      
      //Preenche form com os dados recém editados
      let agendaFormAtualizado = Object.assign({}, this.agenda, this.agendaForm.value)
      this.agendaForm = this.fb.group({
        id: agendaFormAtualizado.id,
        nomeEvento: agendaFormAtualizado.nomeEvento,
        descricaoEvento: agendaFormAtualizado.descricaoEvento,
        inicioEvento: agendaFormAtualizado.inicioEvento,
        fimEvento: agendaFormAtualizado.fimEvento,
        contatoId: agendaFormAtualizado.contatoId,
        userId: agendaFormAtualizado.userId
      });

      this.agendaAtualizada = false;
      this.progress = 0; //Zerando barra de progresso novamente
      this.progressBarAtiva = false;
    }, 2500);
  });

  
}

delAgendaClick(item){
  //if(confirm("Tem certeza que deseja excluir "+item.event._def.title +" ?")){
    this.service.delAgenda(item.event._def.publicId).subscribe(data=>{
      this.refreshAgendaList();
    });

    Swal.fire(
      'Evento Excluido',
      'Evento excluido com sucesso',
      'success'
  )
  //}
}

onError(fail: any) {
  this.errors = fail.error.errors;
}

progressBar(){
  if(this.progress <= 100)
  {
    this.progressBarAtiva = true;
    this.progress = this.progress +1;
    setTimeout(() => {
      this.progressBar()
    }, 20);

    //Desabilitando campos enquanto barra de progresso carrega
    this.agendaForm.controls['nomeEvento'].disable();
    this.agendaForm.controls['descricaoEvento'].disable();
    this.agendaForm.controls['inicioEvento'].disable();
    this.agendaForm.controls['fimEvento'].disable();
    this.agendaForm.controls['contatoId'].disable();
  }
}

homeClick(){
  this.router.navigate(['/contatos']);
}

}
