import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core'; // Importa EventEmitter y Output
import { LibroServicio } from '../services/libro-servicio';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {
  @Output() seleccionado = new EventEmitter<any>(); // Evento para notificar el libro seleccionado

  libroSeleccionado: any = null;
  verDetalle: boolean = false;
  textoBuscado: string = '';

  libros: any[] = [];

  constructor(private libroServicio: LibroServicio) { }

  // Método para manejar la selección del libro y emitir el evento
  onVerDetalle() {
    this.verDetalle = true;
    this.seleccionado.emit(this.libroSeleccionado); // Emite el libro seleccionado al componente padre
  }

  ngOnInit() {
    this.libros = this.libroServicio.getLibros();
  }

  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.verDetalle = false;
  }


}
