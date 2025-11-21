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
  collection: string = 'libros';
  carpeta: string = 'libro-portadas';

  private librosRef;
  
  constructor(private firestore: Firestore, private storage: Storage) { 
    this.librosRef = collection(this.firestore, this.collection); 
  }

  getLibros(): Observable<Libro[]> {
    const data = collectionData(this.librosRef, { idField: 'id' }); 
    return data  as Observable<Libro[]>; 
  } 

  async addImagen(imagenArchivo: File, usuarioId: string): Promise<string | undefined> {
    if (imagenArchivo) {
      const imagenPath = `${this.carpeta}/${usuarioId}/${Date.now()}_${imagenArchivo.name}`;
      const imagenRef = ref(this.storage, imagenPath);  
      await uploadBytes(imagenRef, imagenArchivo);  
      return await getDownloadURL(imagenRef);  
    }
    return undefined; 
  }

  async addLibro(libro: Libro, imagenArchivo: File) {
    libro.imagenUrl = await this.addImagen(imagenArchivo, libro.propietarioId!);  
    addDoc(this.librosRef, libro); 
  }

  async getLibroPorId(id: string): Promise<Libro | undefined> {
    const libroDoc = doc(this.firestore, this.collection, id );  
    const docSnap = await getDoc(libroDoc);  
    if (docSnap.exists()) 
      return docSnap.data() as Libro;  
    return undefined;  
  }

  async actualizarLibro(id: string, libro: Partial<Libro>, imagenArchivo?: File, antiguaUrl?: string ) {
    const libroRef = doc(this.firestore, this.collection, id);  
    if (imagenArchivo) {
      if (antiguaUrl)
        this.borrarImagenStorage(antiguaUrl);  
      libro.imagenUrl = await this.addImagen(imagenArchivo, libro.propietarioId!);  
    }
    updateDoc(libroRef, libro);  
  }

  async eliminarLibro(id: string){
    const libro = await this.getLibroPorId(id);  
    if (libro && libro.imagenUrl)
      this.borrarImagenStorage(libro.imagenUrl);  
    const libroDoc = doc(this.firestore, 'libros', id);  
    deleteDoc(libroDoc);  
  }

  async borrarImagenStorage(imagenUrl: string): Promise<void> {
    if (imagenUrl) {
        const imagenPath = this.getImagenPathDeURL(imagenUrl);
        const imagenStorageRef = ref(this.storage, imagenPath);
        await deleteObject(imagenStorageRef);
    }
  }

  getImagenPathDeURL(imagenUrl: string): string {
    const startIndex = imagenUrl.indexOf('/o/') + 3;
    const endIndex = imagenUrl.indexOf('?');
    const fullPathEncoded = imagenUrl.substring(startIndex, endIndex);
    return decodeURIComponent(fullPathEncoded);
  }
}
