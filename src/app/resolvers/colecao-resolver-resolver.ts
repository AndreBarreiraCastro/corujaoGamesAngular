import { ResolveFn } from '@angular/router';
import { Colecao } from '../models/colecao.model';
import { inject } from '@angular/core';
import { ColecaoService } from '../services/colecao.service';

export const colecaoResolver: ResolveFn<Colecao> = (route, state) => {
  return inject(ColecaoService).buscarPorId(route.paramMap.get('id')!);
};
