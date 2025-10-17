import { Injectable } from '@angular/core';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroServicio {
  libros: Libro[] = [
    {
      id: 1,
      titulo: 'Cien Años de Soledad',
      autor: 'Gabriel García Márquez',  
      anio: 1967,
      descripcion: 'Una novela que narra la historia de la familia Buendía a lo largo de varias generaciones en el pueblo ficticio de Macondo.',
      fechaPublicacion: new Date('1967-05-30') },
    {
      id: 2,
      titulo: 'Don Quijote de la Mancha',   
      autor: 'Miguel de Cervantes',
      anio: 1605,
      descripcion: 'Considerada la primera novela moderna, sigue las aventuras del ingenioso hidalgo Don Quijote y su fiel escudero Sancho Panza.',
      fechaPublicacion: new Date('1605-01-16') },
    {
      id: 3,
      titulo: 'La Sombra del Viento',         
      autor: 'Carlos Ruiz Zafón',
      anio: 2001,
      descripcion: 'Un joven llamado Daniel descubre un libro olvidado en el Cementerio de los Libros Olvidados, lo que lo lleva a una serie de misterios y secretos en la Barcelona de la posguerra.', 
      fechaPublicacion: new Date('2001-04-12') },

    {
      id: 4,
      titulo: 'El Amor en los Tiempos del Cólera', 
      autor: 'Gabriel García Márquez',        
      anio: 1985,
      descripcion: 'Una historia de amor que abarca más de medio siglo, explorando la paciencia y la perseverancia en el amor verdadero.',
      fechaPublicacion: new Date('1985-09-05') },

    {
      id: 5,
      titulo: 'Ficciones',
      autor: 'Jorge Luis Borges', 
      anio: 1944,
      descripcion: 'Una colección de cuentos que exploran temas como la realidad, la identidad y el infinito, característicos del estilo literario de Borges.',
      fechaPublicacion: new Date('1944-06-15') }
  ];

  constructor() { }

  getLibros(): Promise<Libro[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.libros);
      }, 1000); }
    );
  }

  getLibroPorId(id: number): Promise<Libro> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const libro = this.libros.find(libro => libro.id === id);
        console.log("Libro encontrado:", this.libros, libro);
        resolve(libro!);
      }, 1000); }
    );    
  }
}
