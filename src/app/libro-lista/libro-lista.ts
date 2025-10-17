import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LibroServicio } from '../services/libro-servicio';
import { FormsModule } from '@angular/forms';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {
  @Output() seleccionado = new EventEmitter<any>();

  libroSeleccionado: any = null;
  verDetalle: boolean = false;
  textoBuscado: string = '';

  libros: Libro[] = [];

  constructor(private libroServicio: LibroServicio) { }

  onVerDetalle() {
    this.verDetalle = true;
    this.seleccionado.emit(this.libroSeleccionado);
  }

  // Carga los libros al inicializar el componente
  // Usa ngOnInit para llamar al servicio y obtener los libros
  // ngOnInit es un método del ciclo de vida de Angular que se llama después de que el componente ha sido inicializado
  // Marca el método como asíncrono para usar await
  async ngOnInit() {
    this.libros = await this.libroServicio.getLibros(); // Espera a que la promesa se resuelva y asigna el resultado a this.libros
  }

  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.verDetalle = false;
  }


}
