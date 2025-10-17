import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core'; // Importa Input para recibir datos del componente padre

@Component({
  selector: 'app-libro-detalle',
  imports: [CommonModule],
  templateUrl: './libro-detalle.html',
  styleUrl: './libro-detalle.css'
})
export class LibroDetalle {
  @Input() libro: any = null; // Recibe el libro seleccionado como entrada
}
