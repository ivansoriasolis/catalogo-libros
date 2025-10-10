import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LibroDetalle } from '../libro-detalle/libro-detalle';
import { LibroServicio } from '../services/libro-servicio';

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule, LibroDetalle],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {

  libroSeleccionado: any = null;

  libros: any[] = [];

  constructor(private libroServicio:LibroServicio) {}

  ngOnInit() {
    this.libros = this.libroServicio.getLibros();
  }

  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
  }
}
