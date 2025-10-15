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

  async ngOnInit() {
    this.libros = await this.libroServicio.getLibros();
  }

  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.verDetalle = false;
  }


}
