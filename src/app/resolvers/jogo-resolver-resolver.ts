import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';

import { Jogo } from '../models/jogo.model';
import { jogoservice } from '../services/jogo.service';

export const jogoResolver: ResolveFn<Jogo> = (route, state) => {
  return inject(jogoservice).buscarPorId(route.paramMap.get('id')!);
};
