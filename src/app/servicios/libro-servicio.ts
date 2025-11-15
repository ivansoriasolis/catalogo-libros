import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Libro } from '../modelos/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroServicio {
  libros: Libro[] = [];
  titulos: string[] = [];
  private librosRef;
  
  constructor(private firestore: Firestore) { 
    this.librosRef = collection(this.firestore, 'libros'); // Referencia a la colección 'books' en Firestore
  }

  async getTitulos(){
    const books = await firstValueFrom(this.getLibros()); // Obtener la lista de libros desde el servicio
    return books.map(libro => libro.titulo); // Mapea los títulos de los libros existentes para usarlos en la validación asíncrona
  }

  getLibros(): Observable<Libro[]> { // Obtener los libros de Firestore
    const data = collectionData(this.librosRef, { idField: 'id' }) // Obtener los datos de la colección 'books' y asignar el campo 'id' a cada libro
    return data  as Observable<Libro[]>; // Se usa un Observable para que se actualice automáticamente cuando se agreguen, actualicen o eliminen libros en Firestore
  } 

  async addLibro(libro: Libro) {
    addDoc(this.librosRef, libro); // Agregar un nuevo libro a la colección 'books' en Firestore
  }

  async getLibroPorId(id: string): Promise<Libro | undefined> {
    const libroDoc = doc(this.firestore, 'libros', id ); // Crear una referencia al documento del libro
    const docSnap = await getDoc(libroDoc); // Obtener el documento del libro
    if (docSnap.exists()) {
      const data = docSnap.data() as Libro; // Convertir los datos del documento a tipo Book
      return {...data, id: docSnap.id}; // Retornar el libro con su ID
    } 
    return undefined; // No se encontró el libro
  }

  async actualizarLibro(id: string, libro: Partial<Libro>) {
    const libroRef = doc(this.firestore, 'libros', id); // Crear una referencia al documento del libro
    await updateDoc(libroRef, libro); // Actualizar el libro en Firestore
  }

  async eliminarLibro(id: string){
    const libroDoc = doc(this.firestore, 'libros', id); // Crear una referencia al documento del libro
    await deleteDoc(libroDoc); // Eliminar el libro de Firestore
  }
}
