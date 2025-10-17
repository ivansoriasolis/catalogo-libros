import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private autenticado: boolean = false;

  constructor() { }

  // Verifica si el usuario está autenticado
  esAutenticado(): boolean {
    return this.autenticado;
  }

  // Simula el proceso de login
  login(): void {
    this.autenticado = true;
  }

  // Simula el proceso de logout
  logout(): void {
    this.autenticado = false;
  } 
}
