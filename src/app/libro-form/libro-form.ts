import { Component } from '@angular/core';
import { Libro } from '../modelos/libro';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LibroServicio } from '../servicios/libro-servicio';
import { ActivatedRoute, Router } from '@angular/router';
import { validadorAnio } from '../validadores/validadores-personalizados';
import { validadorTituloExiste } from '../validadores/validadores-asincronos';
import { firstValueFrom } from 'rxjs';
import { AuthServicio } from '../servicios/auth-servicio';

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

  antiguaUrl: string | undefined;

  archivoSeleccionado!: File;
  imagenPreview: string | ArrayBuffer | null = null;

  constructor(private libroServicio: LibroServicio,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authServicio: AuthServicio,
  ) {
    this.libroForm = this.fb.group({
      id: [''],  
      titulo: ['', {
        validators: [Validators.required],
        asyncValidators: [validadorTituloExiste(this.titulosExistentes)],  
      }],
      autor: ['', Validators.required],
      descripcion: [''],
      anio: [0, [Validators.required, Validators.pattern('^[0-9]{4}$'), validadorAnio]],   
      fechaPublicacion: [null, Validators.required]  
    }, { updateOn: 'change' });  
  }

  async ngOnInit() {
    const libros = await firstValueFrom(this.libroServicio.getLibros());  
    this.titulosExistentes = libros.map(libro => libro.titulo);  

    const params = await firstValueFrom(this.route.paramMap);
    const id = params.get('id');  

    if (id) {  
      this.esEdicion = true;  
      const libro = await this.libroServicio.getLibroPorId(id);  
      if (libro) {
        this.antiguaUrl = libro.imagenUrl;  
        this.libroForm.patchValue(libro);  
        this.titulosExistentes = this.titulosExistentes.filter(title => title !== libro.titulo);  
        this.imagenPreview = libro.imagenUrl ? libro.imagenUrl : null;  
      }
    }
    this.libroForm.get('titulo')?.setAsyncValidators(validadorTituloExiste(this.titulosExistentes));  
  }

  async guardar() {
    if (this.libroForm.invalid) {
      this.libroForm.markAllAsTouched();  
      return;  
    }
    const libro = this.libroForm.value  

    if (this.esEdicion)
      await this.libroServicio.actualizarLibro(libro.id, libro, this.archivoSeleccionado, this.antiguaUrl)  
    else{
      const usuarioId = this.authServicio.getUsuarioId();  
      const propietarioId = usuarioId ? usuarioId : 'desconocido';  
      libro.propietarioId = propietarioId;  
      await this.libroServicio.addLibro(libro, this.archivoSeleccionado);
    }
    this.libroForm.reset();  
    this.archivoSeleccionado = undefined!;  
    this.imagenPreview = null;  
    this.enviado = true;
    this.router.navigate(['/catalogo']);  
  }

  onArchivoSeleccionado(event: any) {
    this.archivoSeleccionado = event.target.files[0];
    if(this.archivoSeleccionado){
      const reader = new FileReader();
      reader.onload = () => this.imagenPreview = reader.result;
      reader.readAsDataURL(this.archivoSeleccionado);
    }
    this.libroForm.markAsDirty();  
  }

  cancelar() {
    this.router.navigate(['/']);
  }
}
