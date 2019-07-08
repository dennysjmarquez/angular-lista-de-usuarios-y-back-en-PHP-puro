import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuariosComponent} from "./components/usuarios/usuarios.component";
import {UsuarioComponent} from "./components/usuarios/usuario.component";

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id', component: UsuarioComponent },
  { path: '**',  pathMatch: 'full', redirectTo: 'usuarios' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
