import { Routes } from '@angular/router';
import { LibroLista } from './libro-lista/libro-lista';
import { LibroDetalle } from './libro-detalle/libro-detalle';
import { About } from './about/about';

// Define las rutas de la aplicación
export const routes: Routes = [
    { path: '', component: LibroLista }, // Ruta raíz que muestra la lista de libros
    { path: 'detalle/:id', component: LibroDetalle}, // Ruta con parámetro para el detalle del libro
    { path: 'about', component: About} // Ruta para la página "About"
];
