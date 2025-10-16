import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroServicio } from '../services/libro-servicio';
import { Libro } from '../models/libro';

@Component({
  selector: 'app-libro-detalle',
  imports: [CommonModule],
  templateUrl: './libro-detalle.html',
  styleUrl: './libro-detalle.css'
})
export class LibroDetalle {
  libro!: Libro;

  constructor(private ruta: ActivatedRoute,
    private libroServicio:LibroServicio
  ) { }

  async ngOnInit() {
    const id = this.ruta.snapshot.params['id'];
    const libro = await this.libroServicio.getLibroPorId(+id);
    this.libro = libro;
  }
}
