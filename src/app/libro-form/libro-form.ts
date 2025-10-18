import { Component } from '@angular/core';
import { Libro } from '../models/libro';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroServicio } from '../services/libro-servicio';

@Component({
  selector: 'app-libro-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './libro-form.html',
  styleUrl: './libro-form.css'
})
export class LibroForm {
  libro: Libro = {
    id: '',
    titulo: '',
    autor: '',
    anio: 0,
    descripcion: '',
    fechaPublicacion: new Date(),
  }

  enviado = false;

  constructor(private libroServicio:LibroServicio) {}

  async onSubmit() {
    this.enviado = true;
    // Lógica para agregar el libro
    const libroAgregado = await this.libroServicio.agregarLibro(this.libro);
    this.libro = libroAgregado;
    console.log('Libro agregado:', libroAgregado);
  }
}
