import { Component } from '@angular/core';
import { Libro } from '../modelos/libro';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroServicio } from '../servicios/libro-servicio';
import { Router } from '@angular/router';
import { validadorAnio } from '../validadores/validadores-personalizados';
import { validadorTituloExiste } from '../validadores/validadores-asincronos';

@Component({
  selector: 'app-libro-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-form.html',
  styleUrl: './libro-form.css'
})
export class LibroForm {
  libroForm!: FormGroup;
  enviado = false;
  libro!: Libro;
  titulosExistentes: string[] = [];

  constructor(private libroServicio:LibroServicio,
    private fb: FormBuilder,
    private router: Router,
  ) {  }

  async ngOnInit() {
    this.titulosExistentes = (await this.libroServicio.getLibros()).map(libro => libro.titulo.trim().toLowerCase());

    this.libroForm = this.fb.group({
      titulo: ['', 
        { validators: [Validators.required],
          asyncValidators: [validadorTituloExiste(this.titulosExistentes)],
          updateOn: 'blur',
        }],
      autor: ['', Validators.required],  
      anio: ['', [Validators.required, Validators.pattern('^[0-9]{4}$'), validadorAnio]], 
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
