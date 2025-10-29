import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';

import { Classificacao } from '../models/classificacao.model';
import { classificaoservice } from '../services/classificao.service';

export const classificacaoResolver: ResolveFn<Classificacao> = (route, state) => {
  return inject(classificaoservice).buscarPorId(route.paramMap.get('id')!);
};
