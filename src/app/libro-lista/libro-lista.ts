import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LibroServicio } from '../services/libro-servicio';
import { FormsModule } from '@angular/forms';
import { Libro } from '../models/libro';
import { Router } from '@angular/router'; // Importa el servicio Router para la navegación

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
  librosFiltrados: Libro[] = []; // Lista de libros filtrados según la búsqueda

  constructor(private libroServicio: LibroServicio,
    private router: Router // Inyecta el servicio Router para la navegación
  ) { }

  // Navega a la página de detalle del libro seleccionado
  onVerDetalle() {
    this.verDetalle = true;
    this.seleccionado.emit(this.libroSeleccionado);
    this.router.navigate(['detalle', this.libroSeleccionado.id]); // Navega a la ruta de detalle con el ID del libro seleccionado
  }

  async ngOnInit() {
    this.libros = await this.libroServicio.getLibros();
    this.librosFiltrados = [...this.libros]; // Inicializa la lista filtrada con todos los libros
  }

  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.verDetalle = false;
  }

  // Filtra la lista de libros según el texto buscado
  onChange() {  
    this.librosFiltrados = this.libros.filter(libro => // Filtra por título o autor
      libro.titulo.toLowerCase().includes(this.textoBuscado.toLowerCase()) ||
      libro.autor.toLowerCase().includes(this.textoBuscado.toLowerCase())
    );
  }
}
