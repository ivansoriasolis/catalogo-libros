import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './cabecera/cabecera'; // Importa el componente Cabecera
import { LibroLista } from './libro-lista/libro-lista'; // Importa el componente LibroLista

@Component({
  selector: 'app-root',
  imports: [Cabecera, LibroLista], // Importa los componentes Cabecera y LibroLista
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catologo-libros');
}
