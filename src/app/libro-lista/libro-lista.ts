import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-libro-lista',
  imports: [CommonModule], // Importa CommonModule para usar directivas comunes como *ngFor
  templateUrl: './libro-lista.html',
  styleUrl: './libro-lista.css'
})
export class LibroLista {
  libros = [ // Array de libros
    { titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967, fechaPublicacion: new Date(1967, 5, 5)   }, 
    { titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605, fechaPublicacion: new Date(1605, 0, 16) },
    { titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', anio: 2001, fechaPublicacion: new Date(2001, 3, 1) },
  ];
}
