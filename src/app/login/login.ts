import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private auth:Auth,
    private router: Router
  ) { }

  esAutenticado(): boolean {
    return this.auth.esAutenticado();
  }

  login(){
    this.auth.login();
    this.router.navigate(['/agregar']);
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
