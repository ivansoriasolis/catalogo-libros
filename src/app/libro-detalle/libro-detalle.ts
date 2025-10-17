import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-libro-detalle',
  imports: [CommonModule],
  templateUrl: './libro-detalle.html',
  styleUrl: './libro-detalle.css'
})
export class LibroDetalle {
  @Input() libro: any = null; // Recibe el libro seleccionado desde el componente padre

}
