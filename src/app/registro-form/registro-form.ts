import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../validadores/validadores-personalizados';
import { Router, RouterLink } from '@angular/router';
import { AuthServicio } from '../servicios/auth-servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './registro-form.html',
  styleUrl: './registro-form.css',
})
export class RegistroForm {
 registerForm: FormGroup;

  constructor( private fb: FormBuilder, 
    private authService: AuthServicio,
    private router: Router) { 
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
    }, {
      validators: passwordMatchValidator
    });
  }

  async register() { 
    if (this.registerForm.invalid) {
      return;
    }
    const { email, password } = this.registerForm.value;
    // Aquí puedes llamar al servicio de registro
    try {
      await this.authService.register(email, password);
      this.router.navigate(['/catalogo']); // Redirigir al catálogo después del registro exitoso   
    } catch (error) {
      console.error('Error al registrar:', error);
    };
  }
}
