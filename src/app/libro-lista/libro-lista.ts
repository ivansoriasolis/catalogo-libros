import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LibroDetalle } from '../libro-detalle/libro-detalle';
import { LibroServicio } from '../services/libro-servicio'; // Importa el servicio

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule, LibroDetalle],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {

  libroSeleccionado: any = null; // Libro actualmente seleccionado

  libros: any[] = []; // Array para almacenar los libros

  // Inyecta el servicio LibroServicio
  constructor(private libroServicio:LibroServicio) {}

  ngOnInit() {
    this.libros = this.libroServicio.getLibros(); // Obtiene la lista de libros del servicio
  }

  // Maneja la selección de un libro
  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
  }
}
