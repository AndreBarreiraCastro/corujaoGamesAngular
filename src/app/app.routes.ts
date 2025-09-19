import { Routes } from '@angular/router';
import { EstadoListComponent } from './components/estado/estado-list/estado-list.component';
import { CidadeListComponent } from './components/cidade/cidade-list/cidade-list.component';
import { EstadoFormComponent } from './components/estado/estado-form/estado-form.component';
import { CidadeFormComponent } from './components/cidade/cidade-form/cidade-form.component';
import { ColecaoList } from './components/colecao/colecao-list/colecao-list';
import { ColecaoForm } from './components/colecao/colecao-form/colecao-form';
import { colecaoResolver } from './resolvers/colecao-resolver-resolver';
import { SagaList } from './components/saga/saga-list/saga-list';
import { SagaForm } from './components/saga/saga-form/saga-form';
import { sagaResolver } from './resolvers/saga-resolver-resolver';

export const routes: Routes = [
    {path:'estados', component: EstadoListComponent, title: 'Lista de Estados'},
    {path:'estados/new', component: EstadoFormComponent, title: 'Cadastro de Estados'},
    {path:'cidades', component: CidadeListComponent, title: 'Lista de Cidades'},
    {path:'cidades/new', component: CidadeFormComponent, title: 'Cadastro de Cidades'},
    {path:'colecaos', component: ColecaoList, title: 'Lista de Coleção'},
    {path:'colecaos/new', component: ColecaoForm, title: 'Lista de Coleção'},
    { path: 'colecaos/edit/:id', component: ColecaoForm, title: 'Edição de Colecao', 
        resolve: {colecao: colecaoResolver}
    },
    {path:'sagas', component: SagaList, title: 'Lista de Saga'},
    {path:'sagas/new', component: SagaForm, title: 'Lista de Saga'},
    { path: 'sagas/edit/:id', component: SagaForm, title: 'Edição de Saga', 
        resolve: {saga: sagaResolver}
    },
];
