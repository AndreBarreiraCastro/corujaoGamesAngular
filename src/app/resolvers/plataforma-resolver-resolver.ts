import { ResolveFn } from '@angular/router';
import { Plataforma } from '../models/plataforma.model';
import { PlataformaService } from '../services/plataforma.service';
import { inject } from '@angular/core';

export const plataformaResolver: ResolveFn<Plataforma> = (route, state) => {
  return inject(PlataformaService).buscarPorId(route.paramMap.get('id')!);
};