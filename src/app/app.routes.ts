import { Routes } from '@angular/router';
import { LibroLista } from './libro-lista/libro-lista';
import { LibroDetalle } from './libro-detalle/libro-detalle';
import { About } from './about/about';

export const routes: Routes = [
    { path: '', redirectTo: '/catalogo', pathMatch: 'full' },
    {
        path: 'catalogo',
        loadComponent: () => import('./catalogo/catalogo').then(m => m.Catalogo),
        children: [
            {
                path: 'detalle/:id',
                loadComponent: () => import('./libro-detalle/libro-detalle').then(m => m.LibroDetalle)
            }
        ]
    },
    { path: 'about', component: About },
    { path: 'detalle/:id', component: LibroDetalle }
];

