import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroServicio } from '../servicios/libro-servicio';
import { Libro } from '../modelos/libro';
import { AuthServicio } from '../servicios/auth-servicio';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-libro-detalle',
  imports: [CommonModule],
  templateUrl: './libro-detalle.html',
  styleUrl: './libro-detalle.css'
})
export class LibroDetalle {
  libro?: Libro;
  id: string = '';

  constructor(private ruta: ActivatedRoute,
    private router: Router,
    private libroServicio: LibroServicio,
    public authServicio: AuthServicio,
  ) { }

  async ngOnInit() {
    this.id = this.ruta.snapshot.params['id'];
    this.libro = await this.libroServicio.getLibroPorId(this.id);
  }

  editar(id: string) {
    this.router.navigate(['/modificar', id]);
  }

  async eliminar(id: string) {
    await this.libroServicio.eliminarLibro(id);
    this.router.navigate(['/']);
  }

}
