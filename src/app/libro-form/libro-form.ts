import { Component } from '@angular/core';
import { Libro } from '../models/libro';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LibroServicio } from '../services/libro-servicio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-libro-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-form.html',
  styleUrl: './libro-form.css'
})
export class LibroForm {
  libroForm: FormGroup; // Define el formulario reactivo
  enviado = false; // Indica si el formulario ha sido enviado
  libro!: Libro; // Almacena el libro agregado

  constructor(private libroServicio:LibroServicio,
    private fb: FormBuilder, // Inyecta FormBuilder
    private router: Router,
  ) {
    this.libroForm = this.fb.group({ // Configura los controles del formulario
      titulo: [''],
      autor: [''],  
      anio: [''],
      descripcion: [''],
      fechaPublicacion: ['']
    }); 
  }

  // Método para manejar el envío del formulario
  async onSubmit() {
    this.enviado = true;
    const libro = this.libroForm.value; // Obtiene los valores del formulario
    const libroAgregado = await this.libroServicio.agregarLibro(libro);  // Llama al servicio para agregar el libro
    this.libro = libroAgregado
    console.log('Libro agregado:', libroAgregado);
    this.router.navigate(['/']); // Navega de vuelta a la lista de libros
  }
}
