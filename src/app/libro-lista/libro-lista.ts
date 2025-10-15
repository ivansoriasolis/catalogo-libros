import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LibroServicio } from '../services/libro-servicio';
import { FormsModule } from '@angular/forms';
import { LibroDetalle } from '../libro-detalle/libro-detalle';

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule, FormsModule, LibroDetalle],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {
  libroSeleccionado: any = null;
  verDetalle: boolean = false;
  textoBuscado: string = '';

  libros: any[] = [];

  constructor(private libroServicio:LibroServicio) {}

  ngOnInit() {
    this.libros = this.libroServicio.getLibros();
  }

  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.verDetalle = false;
  }

  onVerDetalle() {
    this.verDetalle = true;
  }
}
