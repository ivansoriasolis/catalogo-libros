import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { LibroServicio } from '../servicios/libro-servicio';
import { FormsModule } from '@angular/forms';
import { Libro } from '../modelos/libro';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {
  @Output() seleccionado = new EventEmitter<any>();

  libroSeleccionado: any = null;
  verDetalle: boolean = false;
  textoBuscado: string = '';

  libros: Libro[] = [];
  librosFiltrados: Libro[] = [];

  constructor(private libroServicio: LibroServicio,
    private router: Router
  ) { }

  onVerDetalle() {
    this.verDetalle = true;
    this.seleccionado.emit(this.libroSeleccionado);
    this.router.navigate(['detalle', this.libroSeleccionado.id]);
  }
  async ngOnInit() {
    this.libroServicio.getLibros().subscribe((libros) => {
      this.libros = libros;
      this.librosFiltrados = libros;
    });
  }

  onSeleccionarLibro(libro: any) {
    this.libroSeleccionado = libro;
    this.verDetalle = false;
  }

  onChange() {  
    this.librosFiltrados = this.libros.filter(libro => 
      libro.titulo.toLowerCase().includes(this.textoBuscado.toLowerCase()) ||
      libro.autor.toLowerCase().includes(this.textoBuscado.toLowerCase())
    );
  }
}
