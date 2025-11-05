import { AbstractControl, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, of } from "rxjs";

// Validador asíncrono para verificar si un título de libro ya existe
export function validadorTituloExiste( titulosExistentes: string[] ) {
    return ( control: AbstractControl ): Observable<ValidationErrors | null> => {
        return of(
            titulosExistentes.includes( control.value.trim().toLowerCase() ) ).pipe( // Simula una llamada asíncrona
                delay(500),
                map( existe => 
            existe          
                ? { tituloExiste: true } 
                : null
             ) );
    };
}   