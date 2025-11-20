import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, User } from '@angular/fire/auth';
import { Route, Router } from '@angular/router';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@firebase/auth';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServicio {
  estadoAuth$: Observable<User | null> = new Observable<User | null>;  

  constructor( private auth:Auth, private router: Router, ) { 
    this.estadoAuth$ = authState(this.auth);  
  }

  async register(email: string, password: string): Promise<void> {
    await createUserWithEmailAndPassword(this.auth, email, password);  
  }

  async login(email: string, password: string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);  
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();  
    await signInWithPopup(this.auth, provider);  
  }

  async logout(): Promise<void> {
    await this.auth.signOut();  
  }
  
  esAutenticado(): Observable<boolean> {
    return this.estadoAuth$.pipe(
      map(user => !!user)  
    );
  }

  getUsuarioId(): string | null {
    return this.auth.currentUser ? this.auth.currentUser.uid : null;  
  }

  esPropietario(propietarioId:string): boolean {
    const usuarioId = this.getUsuarioId();
    return propietarioId === usuarioId;
  }
}
export { Auth };

