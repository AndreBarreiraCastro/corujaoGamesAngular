import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';

import { Disco } from '../models/disco.model';
import { discoservice } from '../services/disco.service';

export const discoResolver: ResolveFn<Disco> = (route, state) => {
  return inject(discoservice).buscarPorId(route.paramMap.get('id')!);
};
