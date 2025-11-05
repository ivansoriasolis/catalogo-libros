import { AbstractControl, ValidationErrors } from "@angular/forms";
import { delay, map, Observable, of } from "rxjs";

export function validadorTituloExiste( titulosExistentes: string[] ) {
    return ( control: AbstractControl ): Observable<ValidationErrors | null> => {
        return of(
            titulosExistentes.includes( control.value.trim().toLowerCase() ) ).pipe(
                delay(500),
                map( existe => 
            existe          
                ? { tituloExiste: true } 
                : null
             ) );
    };
}   