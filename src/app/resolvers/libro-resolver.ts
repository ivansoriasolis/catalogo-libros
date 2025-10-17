import { ResolveFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { LibroServicio } from '../services/libro-servicio';

// Resolvedor para obtener un libro por su ID antes de cargar el componente de detalle
export const libroResolver: ResolveFn<any> = (route: ActivatedRouteSnapshot) => {
  const service = inject<LibroServicio>(LibroServicio); // Inyecta el servicio de libros
  const id = route.paramMap.get('id')!; // Obtiene el ID del libro desde los parámetros de la ruta
  return service.getLibroPorId(+id); // Retorna la promesa del libro
};
