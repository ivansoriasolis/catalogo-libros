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
      const imagenRef = ref(this.storage, imagenPath);  
      await uploadBytes(imagenRef, imagenArchivo);  
      const imagenURL = await getDownloadURL(imagenRef);  
      return imagenURL;  
    }
    return '';
  }

  async addLibro(libro: Libro, imagenArchivo: File) {
    libro.imagenUrl = await this.addImagen(imagenArchivo, libro.propietarioId!);  
    const {id, ...libroData} = libro;  
    addDoc(this.librosRef, libroData); 
  }

  async getLibroPorId(id: string): Promise<Libro | undefined> {
    const libroDoc = doc(this.firestore, 'libros', id );  
    const docSnap = await getDoc(libroDoc);  
    if (docSnap.exists()) {
      const data = docSnap.data() as Libro;  
      data.id = docSnap.id;  
      return data;  
    } 
    return undefined;  
  }

  async actualizarLibro(id: string, libro: Partial<Libro>, imagenArchivo?: File, antiguaUrl?: string ) {
    const libroRef = doc(this.firestore, 'libros', id);  
    if (imagenArchivo) {
      if (antiguaUrl) {
        await this.borrarImagenStorage(antiguaUrl);  
      }
      const nuevaImagenUrl = await this.addImagen(imagenArchivo, libro.propietarioId!);  
      libro.imagenUrl = nuevaImagenUrl;  
    }
    updateDoc(libroRef, libro);  
  }

  async eliminarLibro(id: string){
    const libro = await this.getLibroPorId(id);  
    if (libro && libro.imagenUrl) {
      await this.borrarImagenStorage(libro.imagenUrl);  
    }

    const libroDoc = doc(this.firestore, 'libros', id);  
    await deleteDoc(libroDoc);  
  }

  async borrarImagenStorage(imagenUrl: string): Promise<void> {
    if (imagenUrl) {
      try {
        const imagenPath = this.getImagenPathDeURL(imagenUrl);
        const imagenStorageRef = ref(this.storage, imagenPath);
        await deleteObject(imagenStorageRef);
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
