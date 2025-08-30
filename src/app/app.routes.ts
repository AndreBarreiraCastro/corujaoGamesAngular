import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';

export const routes: Routes = [
    {path:'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    {path:'estados/new', component: EstadoFormComponent, title: 'Cadastro de Estados'},
    {path:'cidades', component: CidadeListComponent, title: 'Lista de Cidades'},
    {path:'cidades/new', component: CidadeFormComponent, title: 'Cadastro de Cidadess'},
];
