import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Servicio para acceder a los parámetros de la ruta
import { LibroServicio } from '../services/libro-servicio';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-libro-detalle',
  imports: [CommonModule],
  templateUrl: './libro-detalle.html',
  styleUrl: './libro-detalle.css'
})
export class LibroDetalle {
  libro!: Libro;

  constructor(private ruta: ActivatedRoute, // Servicio para acceder a los parámetros de la ruta
    private libroServicio:LibroServicio
  ) { }

  // Obtiene el ID del libro desde la ruta y carga los detalles del libro
  async ngOnInit() {
    const id = this.ruta.snapshot.params['id']; // Obtiene el ID del libro desde la ruta
    const libro = await this.libroServicio.getLibroPorId(+id); // Carga los detalles del libro usando el servicio
    this.libro = libro; // Asigna el libro cargado a la propiedad 'libro' para mostrar los detalles
  }
}
