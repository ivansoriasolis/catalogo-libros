import { Routes } from '@angular/router';
import { LibroDetalle } from './libro-detalle/libro-detalle';
import { About } from './about/about';

export const routes: Routes = [
    { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
    {
        // Lazy loading del componente Catalogo
        path: 'catalogo',
        loadComponent: () => import('./catalogo/catalogo').then(m => m.Catalogo), // Componente Catalogo cargado de forma perezosa
        children: [
            {
                // Ruta hija para el detalle del libro
                path: 'detalle/:id', // Ruta para el detalle del libro
                loadComponent: () => import('./libro-detalle/libro-detalle').then(m => m.LibroDetalle) // Componente LibroDetalle cargado de forma perezosa
            }
        ]
    },
    { path: 'about', component: About },
    { path: 'detalle/:id', component: LibroDetalle }
];

