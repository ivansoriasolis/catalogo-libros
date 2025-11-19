import { Component, Input, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Cabecera } from './cabecera/cabecera';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { AuthServicio } from './servicios/auth-servicio';

@Component({
  selector: 'app-root',
  imports: [Cabecera, RouterOutlet, FormsModule, CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('catologo-libros');
  authVerificado = false; // Nueva variable para rastrear la verificación de autenticación

  libroSeleccionado: any = null;

  constructor(private authServicio: AuthServicio,
    private router: Router,
  ){}

  // Verifica el estado de autenticación al iniciar la aplicación
  ngOnInit():void{
    this.authServicio.estadoAuth$.subscribe((usuario) => {
      this.authVerificado = true; // Marca que la verificación ha sido completada
      if (usuario) { // Si el usuario está autenticado
        this.router.navigate(['/cataologo']);
      }  
      else {
        this.router.navigate(['/']);
      }
    });
  }
}
