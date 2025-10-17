import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

// Guardia de ruta para proteger rutas que requieren autenticación
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Inyecta el router para redireccionar si no está autenticado
  const authService = inject(Auth); // Inyecta el servicio de autenticación

  if (authService.esAutenticado()) {// Verifica si el usuario está autenticado
    return true;
  }
  else {
    return router.createUrlTree(['/login']); // Redirecciona a la página de login si no está autenticado
  }
};
