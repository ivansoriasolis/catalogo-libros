import { Component } from '@angular/core';
import { LibroLista } from "../libro-lista/libro-lista";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  imports: [LibroLista, RouterOutlet],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo {
  libroSeleccionado: any = null;
  tituloSeleccionado: string = '';
}
