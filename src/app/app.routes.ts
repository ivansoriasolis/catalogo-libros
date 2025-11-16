import { Routes } from '@angular/router';
import { LibroLista } from './libro-lista/libro-lista';
import { LibroDetalle } from './libro-detalle/libro-detalle';
import { About } from './about/about';
import { authGuard } from './guards/auth-guard';
import { Login } from './login/login';
import { LibroForm } from './libro-form/libro-form';
import { RegistroForm } from './registro-form/registro-form';

export const routes: Routes = [
    { path: '', component: LibroLista },
    { path: 'catalogo', component: LibroLista },
    { path: 'detalle/:id', component: LibroDetalle },
    { path: 'about', component: About},
    { path: 'login', component: Login},
    { path: 'agregar', component: LibroForm, canActivate: [authGuard] },
    { path: 'modificar/:id', component: LibroForm, canActivate: [authGuard] },
    { path: 'registro', component: RegistroForm }
];

