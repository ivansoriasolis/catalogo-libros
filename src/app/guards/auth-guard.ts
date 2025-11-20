import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServicio } from '../servicios/auth-servicio';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authServicio = inject(AuthServicio);

  return authServicio.estadoAuth$.pipe(  
    take(1),  
    map(user => user ? true : router.createUrlTree(['/login']))  
  );
};
