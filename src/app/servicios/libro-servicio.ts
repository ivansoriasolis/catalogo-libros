import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { Libro } from '../modelos/libro';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class LibroServicio {
  libros: Libro[] = [];
  titulos: string[] = [];
  private librosRef;
  
  constructor(private firestore: Firestore, private storage: Storage) { 
    this.librosRef = collection(this.firestore, 'libros'); 
  }

  async getTitulos(){
    const books = await firstValueFrom(this.getLibros()); 
    return books.map(libro => libro.titulo); 
  }

  getLibros(): Observable<Libro[]> {
    const data = collectionData(this.librosRef, { idField: 'id' });
    return data  as Observable<Libro[]>; 
  } 

  async addImagen(imagenArchivo: File, usuarioId: string): Promise<string> {
    if (imagenArchivo) {
      const imagenPath = `libro-portadas/${usuarioId}/${Date.now()}_${imagenArchivo.name}`;
      const imagenRef = ref(this.storage, imagenPath); // Crear una referencia en Firebase Storage
      await uploadBytes(imagenRef, imagenArchivo); // Subir el archivo de imagen a Firebase Storage
      const imagenURL = await getDownloadURL(imagenRef); // Obtener la URL de descarga de la imagen subida
      return imagenURL; // Retornar la URL de la imagen
    }
    return '';
  }

  async addLibro(libro: Libro, imagenArchivo: File) {
    libro.imagenUrl = await this.addImagen(imagenArchivo, libro.propietarioId!); // Subir la imagen y obtener su URL
    const {id, ...libroData} = libro; // Excluir el ID del libro si existe
    addDoc(this.librosRef, libroData); 
  }

  async getLibroPorId(id: string): Promise<Libro | undefined> {
    const libroDoc = doc(this.firestore, 'libros', id ); // Crear una referencia al documento del libro
    const docSnap = await getDoc(libroDoc); // Obtener el documento del libro
    if (docSnap.exists()) {
      const data = docSnap.data() as Libro; // Convertir los datos del documento a tipo Libro
      data.id = docSnap.id; // Asignar el ID del documento al libro
      return data; // Retornar el libro con su ID
    } 
    return undefined; // No se encontró el libro
  }

  async actualizarLibro(id: string, libro: Partial<Libro>, imagenArchivo?: File, antiguaUrl?: string ) {
    const libroRef = doc(this.firestore, 'libros', id); // Crear una referencia al documento del libro
    if (imagenArchivo) {
      if (antiguaUrl) {
        await this.borrarImagenStorage(antiguaUrl); // Borrar la imagen antigua si existe
      }
      const nuevaImagenUrl = await this.addImagen(imagenArchivo, libro.propietarioId!); // Subir la nueva imagen y obtener su URL
      libro.imagenUrl = nuevaImagenUrl; // Actualizar la URL de la imagen en el libro
    }
    updateDoc(libroRef, libro); // Actualizar el libro en Firestore
  }

  async eliminarLibro(id: string){
    const libro = await this.getLibroPorId(id); // Obtener el libro por su ID
    if (libro && libro.imagenUrl) {
      await this.borrarImagenStorage(libro.imagenUrl); // Borrar la imagen asociada al libro si existe
    }

    const libroDoc = doc(this.firestore, 'libros', id); // Crear una referencia al documento del libro
    await deleteDoc(libroDoc); // Eliminar el libro de Firestore
  }

  async borrarImagenStorage(imagenUrl: string): Promise<void> {
    if (imagenUrl) {
      try {
        const imagenPath = this.getImagenPathDeURL(imagenUrl);
        const imagenStorageRef = ref(this.storage, imagenPath);
        await deleteObject(imagenStorageRef); // Borrar la imagen de Firebase Storage
      } catch (error) {
        console.error('Error al borrar la imagen de Storage:', error);
      }
    }
  }

  getImagenPathDeURL(imagenUrl: string): string {
    const startIndex = imagenUrl.indexOf('/o/') + 3;
    const endIndex = imagenUrl.indexOf('?');
    const fullPathEncoded = imagenUrl.substring(startIndex, endIndex);
    return decodeURIComponent(fullPathEncoded);
  }
}
