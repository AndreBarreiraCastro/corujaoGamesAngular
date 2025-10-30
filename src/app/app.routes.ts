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
import { PlataformaList } from './components/plataforma/plataforma-list/plataforma-list';
import { plataformaResolver } from './resolvers/plataforma-resolver-resolver';
import { PlataformaForm } from './components/plataforma/plataforma-form/plataforma-form';

import { ClassificacaoForm } from './components/classificacao/classificao-form/classificao-form';
import { classificacaoResolver } from './resolvers/classificacao-resolver-resolver';
import { ClassificacaoList } from './components/classificacao/classificao-list/classificao-list';
import { EstoqueList } from './components/estoque/estoque-list/estoque-list';
import { EstoqueForm } from './components/estoque/estoque-form/estoque-form';
import { estoqueResolver } from './resolvers/estoque-resolver-resolver';
import { DiscoList } from './components/disco/disco-list/disco-list';
import { DiscoForm } from './components/disco/disco-form/disco-form';
import { discoResolver } from './resolvers/disco-resolver-resolver';

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
    {path:'plataformas', component: PlataformaList, title: 'Lista de Plataformas'},
    
    {path:'plataformas/new', component: PlataformaForm, title: 'Lista de Plataforma'},
    { path: 'plataformas/edit/:id', component: PlataformaForm, title: 'Edição de Plataforma', 
        resolve: {plataforma: plataformaResolver}
    },
    {path:'classificacaos', component: ClassificacaoList, title: 'Lista de Classificações'},
    {path:'classificacaos/new', component: ClassificacaoForm, title: 'Criação de Classificações'},
    { path: 'classificacaos/edit/:id', component: ClassificacaoForm, title: 'Edição de Classificações', 
        resolve: {classificacao: classificacaoResolver}
    },
    {path:'estoques', component: EstoqueList, title: 'Estoques'},
    {path:'estoques/new', component: EstoqueForm, title: 'Criação de Estoques'},
    { path: 'estoques/edit/:id', component: EstoqueForm, title: 'Edição de Estoques', 
        resolve: {estoque: estoqueResolver}
    },
    {path:'discos', component: DiscoList, title: 'Discos'},
    {path:'discos/new', component:DiscoForm, title: 'Criação de Discos'},
    { path: 'discos/edit/:id', component: DiscoForm, title: 'Edição de Discos', 
        resolve: {disco: discoResolver}
    },
];
