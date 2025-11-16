import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { AuthServicio } from '../servicios/auth-servicio';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cabecera',
  imports: [RouterLink, CommonModule],
  templateUrl: './cabecera.html',
  styleUrl: './cabecera.css'
})
export class Cabecera {
  auth$: any;
  constructor(public authServicio: AuthServicio, // Inyectar el servicio de autenticación
    private router: Router
  ) { }

  ngOnInit() { 
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.authServicio.logout();
    this.router.navigate(['/login']);
  }

}
