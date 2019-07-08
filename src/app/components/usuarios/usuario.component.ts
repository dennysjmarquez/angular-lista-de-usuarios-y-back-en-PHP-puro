import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DbService} from "../../services/db.service";
import {Usuario} from "../../interfaces/usuario";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faTable, faUserPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario = {

    nombres: '',
    apellidos: '',
    cedula: '',
    correo: '',
    telefono: ''

  };

  formUsuario: FormGroup;
  spinner: boolean = false;
  nuevo: boolean = false;
  id$ = '';

  constructor(private activatedRoute: ActivatedRoute, private dbService: DbService, private router: Router) {

    library.add(faTable, faUserPlus);

    this.formUsuario = new FormGroup({

      nombres: new FormControl('', [
        Validators.required
      ]),
      apellidos: new FormControl('', [
        Validators.required
      ]),
      cedula: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(8),
        Validators.minLength(7)
      ], [
        this.cedulaExistsValidator.bind(this)
      ]),
      correo: new FormControl('', [
        Validators.required,
        Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/)
      ], [
        this.correoExistsValidator.bind(this)
      ]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]+$/),
        Validators.maxLength(15),
        Validators.minLength(11)
      ])

    });

    this.activatedRoute.params.subscribe((data: any) => {

      data.id === 'nuevo'
        ? (this.nuevo = true)
        : (this.nuevo = false);

      this.id$ = data.id;
      this.nuevo && this.formUsuario.reset();

      this.nuevo || this.dbService.getUsuario(this.id$).subscribe((usuario: any[]) => {

        if(usuario.length){

          this.usuario = usuario[0];
          this.formUsuario.setValue(this.usuario);

        }else{

          alert('Usuario no encontrado!');
          this.router.navigate(['/usuarios']);

        }

      });

    });

  }

  correoExistsValidator(control:FormControl): Promise<any> {

    let promise = new Promise((resolve, reject) => {

      setTimeout(() => {

        this.dbService.correoExists(control.value).subscribe(data => {

          data.id
            ? this.nuevo
            ? resolve({existe: true})
            : this.id$ !== data.id.toString() ? resolve({existe: true}) : resolve(null)
            : resolve(null);

        });

      }, 500);

    });

    return promise;

  }

  cedulaExistsValidator(control:FormControl): Promise<any> {

     let promise = new Promise((resolve, reject) => {

      setTimeout(() => {

        this.dbService.cedulaExists(control.value).subscribe(data => {

          data.id
            ? this.nuevo
              ? resolve({existe: true})
              : this.id$ !== data.id.toString() ? resolve({existe: true}) : resolve(null)
            : resolve(null);

        });

      }, 500);

    });


    return promise;

  }

  spinnerOff(){
    setTimeout(()=>this.spinner = false, 1000);
  }

  guardar(){

    if(this.formUsuario.valid){

      this.spinner = true;

      if (this.nuevo) {

        this.dbService.nuevoUsuario(this.formUsuario.value).subscribe(data => {

          data.id && this.router.navigate(['/usuario', data.id]);
          this.spinnerOff()

        });

      }else{

        this.dbService.upDateUsuario(this.formUsuario.value, this.id$).subscribe(data => {

          this.spinnerOff()

        });

      }

    }else{

      this.validateAllFormFields(this.formUsuario);

    }

  }

  validateAllFormFields(formGroup: FormGroup) {

    Object.keys(formGroup.controls).forEach(field => formGroup.get(field).markAsTouched({ onlySelf: true }));

  }

  ngOnInit() {
  }

}
