import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';

import { Estoque } from '../models/estoque.model';
import { estoqueservice } from '../services/estoque.service';

export const estoqueResolver: ResolveFn<Estoque> = (route, state) => {
  return inject(estoqueservice).buscarPorId(route.paramMap.get('id')!);
};
