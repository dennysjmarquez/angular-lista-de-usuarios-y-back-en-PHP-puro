import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-btmodal',
  template: `
    <div class="modal fade-scale" id="borrarModalUsuario" data-modal="" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">Borrar</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Seguro que quiere borra al usuario:  <strong>{{this.usuarioModal}}</strong>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-sm btn-primary" data-dismiss="modal" (click)="aceptar()">Si</button>
            <button type="button" class="btn btn-sm btn-secondary" data-dismiss="modal">No</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-header{
      color: white;
      background: #343a40;
      border-radius: unset;
    }

    .modal-footer > *{
      min-width: 50px;
    }
    
    .modal-header .close{
      color: white;
    }
    
    .fade-scale {
      top: -80%;
      transform: scale(0);
      opacity: 0;
      -webkit-transition: all .15s linear;
      -o-transition: all .15s linear;
      transition: all .15s linear;
    }

    .fade-scale.show {
      top: 25%;
      transform: scale(1);
      opacity: 1;
    }
  `]
})
export class BtmodalComponent implements OnInit {

  @Input() usuarioModal: string = '';
  @Output() aceptarModal = new EventEmitter<boolean>();

  constructor() { }

  aceptar(){ this.aceptarModal.emit(true) }

  ngOnInit() {
  }

}
