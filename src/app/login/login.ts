import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private auth:Auth,
    private router: Router
  ) { }

  // Simula el proceso de login
  login(){
    this.auth.login();
    this.router.navigate(['']);
  }
}
