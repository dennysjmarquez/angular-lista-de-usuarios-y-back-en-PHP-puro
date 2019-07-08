import { Component, OnInit } from '@angular/core';
import { DbService } from "../../services/db.service";

import { library } from '@fortawesome/fontawesome-svg-core';
import {faUserEdit, faUserPlus, faUserTimes} from "@fortawesome/free-solid-svg-icons";

declare var $: any ;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];
  loading = true;
  usuarioModal: string = '';

  private borrarUsuarioID: string;

  constructor(private dbService: DbService) {

    library.add(faUserEdit, faUserTimes, faUserPlus);

    this.dbService.getUsuarios().subscribe((data: any) => {

      this.usuarios = data || [];
      this.loading = false;

    });

  }

  borrarUsuario(){

    this.dbService.borrarUsuario(this.borrarUsuarioID).subscribe((data: any) => {

      let empty = true;

      delete this.usuarios[this.borrarUsuarioID];

      for(let d in this.usuarios ){empty = false; break;}


      empty && (this.usuarios = []);

    });

  }

  borrarUsuarioModal(id$: string, name: string){

    this.usuarioModal = name;

    this.borrarUsuarioID = id$;

    $('#borrarModalUsuario').modal('show');

  }

  ngOnInit() {
  }

}
