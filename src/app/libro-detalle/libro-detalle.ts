import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroServicio } from '../servicios/libro-servicio';
import { Libro } from '../modelos/libro';

@Component({
  selector: 'app-libro-detalle',
  imports: [CommonModule],
  templateUrl: './libro-detalle.html',
  styleUrl: './libro-detalle.css'
})
export class LibroDetalle {
  libro?: Libro;

  constructor(private ruta: ActivatedRoute,
    private router: Router,
    private libroServicio:LibroServicio
  ) { }

  async ngOnInit() {
    const id = this.ruta.snapshot.params['id'];
    const libro = await this.libroServicio.getLibroPorId(id);
    this.libro = libro;
  }

  editar(id: string) {
    this.router.navigate(['/agregar', id]);
  }

  async eliminar(id: string) {
    await this.libroServicio.deleteBook(id);
    this.router.navigate(['/']);
  }
}
