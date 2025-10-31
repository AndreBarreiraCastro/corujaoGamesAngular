import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';

import { Cartucho } from '../models/cartucho.model';
import { cartuchoservice } from '../services/cartucho.service';

export const cartuchoResolver: ResolveFn<Cartucho> = (route, state) => {
  return inject(cartuchoservice).buscarPorId(route.paramMap.get('id')!);
};
