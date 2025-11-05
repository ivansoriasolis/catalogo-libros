import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LibroServicio } from '../servicios/libro-servicio';

export const libroResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const service = inject<LibroServicio>(LibroServicio);
  const id = route.paramMap.get('id')!;
  return service.getLibroPorId(id);
};
