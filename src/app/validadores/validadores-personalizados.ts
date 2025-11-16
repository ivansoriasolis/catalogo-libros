import { AbstractControl, ValidationErrors } from "@angular/forms";

export function validadorAnio(control: AbstractControl): ValidationErrors | null {
    const anio = +control.value;
    if (anio < 1500 || anio > new Date().getFullYear()) { 
        return { anioInvalido: true };
    }   
    return null;   
}

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

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;
  if (password !== confirmPassword) {
    return { passwordsDoNotMatch: true };
  }
  return null;
}