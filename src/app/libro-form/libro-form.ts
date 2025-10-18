import { Component } from '@angular/core';
import { Libro } from '../models/libro';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LibroServicio } from '../services/libro-servicio';

@Component({
  selector: 'app-libro-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-form.html',
  styleUrl: './libro-form.css'
})
export class LibroForm {
  libroForm: FormGroup;
  enviado = false;
  libro!: Libro;

  constructor(private libroServicio:LibroServicio,
    private fb: FormBuilder,
  ) {
    this.libroForm = this.fb.group({
      titulo: [''],
      autor: [''],  
      anio: [''],
      descripcion: [''],
      fechaPublicacion: ['']
    }); 
  }

  async onSubmit() {
    this.enviado = true;
    const libro = this.libroForm.value;
    const libroAgregado = await this.libroServicio.agregarLibro(libro);
    this.libro = libroAgregado
    console.log('Libro agregado:', libroAgregado);
  }
}
