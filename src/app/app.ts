import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './cabecera/cabecera';
import { LibroLista } from './libro-lista/libro-lista';

@Component({
  selector: 'app-root',
  imports: [Cabecera, LibroLista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catologo-libros');
}
