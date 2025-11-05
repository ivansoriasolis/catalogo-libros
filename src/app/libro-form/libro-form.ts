import { Component } from '@angular/core';
import { Libro } from '../models/libro';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroServicio } from '../services/libro-servicio';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],  
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]], // Validar que sea un año de 4 dígitos
      descripcion: [''],
      fechaPublicacion: ['', Validators.required]
    }); 
  }

  async onSubmit() {
    this.enviado = true;
    const libro = this.libroForm.value;
    const libroAgregado = await this.libroServicio.agregarLibro(libro);
    this.libro = libroAgregado
    console.log('Libro agregado:', libroAgregado);
    this.router.navigate(['/']);
  }
}
