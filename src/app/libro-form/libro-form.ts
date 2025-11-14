import { Component } from '@angular/core';
import { Libro } from '../modelos/libro';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroServicio } from '../servicios/libro-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { validadorAnio } from '../validadores/validadores-personalizados';
import { validadorTituloExiste } from '../validadores/validadores-asincronos';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-libro-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './libro-form.html',
  styleUrl: './libro-form.css'
})
export class LibroForm {
  libroForm!: FormGroup;
  libro!: Libro;
  titulosExistentes: string[] = [];

  esEdicion: boolean = false;
  enviado: boolean = false;

  constructor(private libroServicio: LibroServicio,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.libroForm = this.fb.group({
      id: [''], // Inicializa el ID como una cadena vacía, se llenará al editar un libro
      titulo: ['', {
        validators: [Validators.required],
        asyncValidators: [validadorTituloExiste(this.titulosExistentes)], // Validador asíncrono para verificar si el título ya existe
      }],
      autor: ['', Validators.required],
      descripcion: [''],
      anio: [0, [Validators.required, Validators.pattern('^[0-9]{4}$'), validadorAnio]],  // Validador personalizado para el año
      fechaPublicacion: [null, Validators.required] // Inicializa la fecha de publicación como null
    }, { updateOn: 'change' }); // Actualiza el formulario solo al enviar, no al cambiar los valores de los campos
  }

  async ngOnInit() {
    const libros = await firstValueFrom(this.libroServicio.getLibros()); // Obtiene la lista de libros desde el servicio
    this.titulosExistentes = libros.map(libro => libro.titulo); // Mapea los títulos de los libros existentes para usarlos en la validación asíncrona

    const params = await firstValueFrom(this.route.paramMap);
    const id = params.get('id'); // Obtiene el ID del libro desde los parámetros de la ruta

    if (id) { // Si hay un ID, significa que estamos en modo edición
      this.esEdicion = true; // Cambia a modo edición
      const libro = await this.libroServicio.getLibroPorId(id); // Obtiene el libro por ID
      if (libro) {
        this.libroForm.patchValue(libro); // Rellena el formulario con los datos del libro
        this.titulosExistentes = this.titulosExistentes.filter(title => title !== libro.titulo); // Elimina el título del libro actual de los títulos existentes para evitar conflictos en la validación
      }
    }
    this.libroForm.get('titulo')?.setAsyncValidators(validadorTituloExiste(this.titulosExistentes)); // Establece el validador asíncrono para el título al cargar los títulos existentes
  }

  async guardar() {
    if (this.libroForm.invalid) {
      this.libroForm.markAllAsTouched(); // Marca todos los campos como tocados para mostrar errores
      return; // No envía el formulario si es inválido
    }
    const book = this.libroForm.value // Obtiene los valores del formulario
    if (this.esEdicion)
      await this.libroServicio.updateBook(book.id, book) // Si es edición, actualiza el libro
    else
      await this.libroServicio.addLibro(book)
    this.router.navigate(['/catalogo']); // Redirige a la lista de libros después de guardar
  }

  async onSubmit() {
    this.enviado = true;
    const libro = this.libroForm.value;
    await this.libroServicio.addLibro(libro);
    console.log('Libro agregado:', libro);
    this.router.navigate(['/']);
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
