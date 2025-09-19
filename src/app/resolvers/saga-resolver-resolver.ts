import { ResolveFn } from '@angular/router';

import { inject } from '@angular/core';

import { Saga } from '../models/saga.model';
import { SagaService } from '../services/saga.service';

export const sagaResolver: ResolveFn<Saga> = (route, state) => {
  return inject(SagaService).buscarPorId(route.paramMap.get('id')!);
};
