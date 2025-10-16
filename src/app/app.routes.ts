import { Routes } from '@angular/router';
import { LibroLista } from './libro-lista/libro-lista';
import { LibroDetalle } from './libro-detalle/libro-detalle';
import { About } from './about/about';

export const routes: Routes = [
    { path: '', component: LibroLista },
    { path: 'detalle/:id', component: LibroDetalle},
    { path: 'about', component: About}
];
