import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { Route, Router } from '@angular/router';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicio {
  estadoAuth$: Observable<User | null> = new Observable<User | null>; // Observable del estado de autenticación

  constructor( private auth:Auth, private router: Router, ) { 
    this.estadoAuth$ = authState(this.auth); // Observable que emite el estado de autenticación
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password); // Registra un nuevo usuario con correo y contraseña
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password); // Inicia sesión con correo y contraseña
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider(); // Proveedor de autenticación de Google
    await signInWithPopup(this.auth, provider); // Inicia sesión con Google mediante una ventana emergente
  }

  async logout(): Promise<void> {
    await this.auth.signOut(); // Cierra la sesión del usuario
  }
  
  esAutenticado(): Observable<boolean> {
    return this.estadoAuth$.pipe(
      map(user => !!user) // Mapea el estado de autenticación a un booleano
    );
  }

  getUsuarioId(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null; // Retorna el ID del usuario autenticado o null si no hay ninguno
  }

  esPropietario(propietarioId:string): boolean {
    const usuarioId = this.getUsuarioId();
    return propietarioId === usuarioId;
  }
}
export { Auth };

