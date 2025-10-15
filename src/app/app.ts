import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Cabecera } from './cabecera/cabecera';
import { LibroLista } from './libro-lista/libro-lista';
import { FormsModule } from '@angular/forms';
import { LibroDetalle } from './libro-detalle/libro-detalle';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Cabecera, LibroLista,FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catologo-libros');

  libroSeleccionado: any = null;

}
