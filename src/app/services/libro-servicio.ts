import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LibroServicio {
  constructor() { }

  getLibros() { // Simula la obtención de datos desde una fuente externa
    return [ // Array de libros de ejemplo
      { id: 1, titulo: 'Cien Años de Soledad', autor: 'Gabriel García Márquez', descripcion: 'Una novela que narra la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo.' },
      { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', descripcion: 'La historia de un hidalgo que, influenciado por los libros de caballerías, decide convertirse en caballero andante.' },
      { id: 3, titulo: 'La Sombra del Viento', autor: 'Carlos Ruiz Zafón', descripcion: 'Un joven descubre un libro olvidado en una biblioteca secreta y se ve envuelto en un misterio que abarca décadas.' },
      { id: 4, titulo: 'El Amor en los Tiempos del Cólera', autor: 'Gabriel García Márquez', descripcion: 'Una historia de amor que se desarrolla a lo largo de más de cincuenta años, explorando la paciencia y la perseverancia del amor verdadero.' },
      { id: 5, titulo: 'Ficciones', autor: 'Jorge Luis Borges', descripcion: 'Una colección de cuentos que exploran temas como la realidad, la identidad y el infinito a través de narrativas complejas y metafísicas.' }
    ];
  }
}
