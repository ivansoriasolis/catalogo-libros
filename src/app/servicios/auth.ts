import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private autenticado: boolean = false;

  constructor() { }

  esAutenticado(): boolean {
    return this.autenticado;
  }

  login(): void {
    this.autenticado = true;
  }

  logout(): void {
    this.autenticado = false;
  }
  
}
