import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServicio } from '../servicios/auth-servicio';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  errorMessage: string = '';  

  constructor(public authService:AuthServicio, 
    private fb: FormBuilder,
    private router: Router,
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.authService.estadoAuth$.subscribe(user => {
      if (user) {
        this.router.navigate(['/catalogo']);  
      }
    });
  }

  async onLogin() { 
    if (this.loginForm.invalid)
      return;
    const { email, password } = this.loginForm.value;
    try {
      await this.authService.login(email, password);  
    } catch (error) {
      this.errorMessage = "Error al iniciar sesión. Por favor, verifica tus credenciales.";
    }
  }

  async onLoginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();  
      this.router.navigate(['/catalogo']);  
    } catch (error) {
      this.errorMessage = "Error al iniciar sesión con Google. Por favor, intenta nuevamente.";
    }
  }
}
