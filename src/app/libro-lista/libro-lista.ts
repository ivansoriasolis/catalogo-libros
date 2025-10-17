import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LibroDetalle } from '../libro-detalle/libro-detalle';
import { LibroServicio } from '../services/libro-servicio';
import { FormsModule } from '@angular/forms'; // Importa FormsModule para el enlace de datos

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule, LibroDetalle, FormsModule], //
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {

  libroSeleccionado: any = null; // Libro seleccionado
  verDetalle: boolean = false; // Controla la visibilidad del detalle del libro
  textoBuscado: string = ''; // Texto para buscar libros

  libros: any[] = [];

  constructor(private libroServicio:LibroServicio) {}

  // Inicializa la lista de libros al cargar el componente
  ngOnInit() {
    this.libros = this.libroServicio.getLibros(); // Obtiene la lista de libros desde el servicio
  }

  // Maneja la selección de un libro
  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.verDetalle = false; // Oculta el detalle del libro al seleccionar uno nuevo
  }

  // Muestra el detalle del libro seleccionado
  onVerDetalle() {
    this.verDetalle = true; // Muestra el detalle del libro
  }
}
