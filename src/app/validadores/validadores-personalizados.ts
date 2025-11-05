import { AbstractControl, ValidationErrors } from "@angular/forms";

// Validador personalizado para el año de publicación
export function validadorAnio(control: AbstractControl): ValidationErrors | null {
    const anio = +control.value; // Convertir a número
    if (anio < 1500 || anio > new Date().getFullYear()) {  // Año inválido
        return { anioInvalido: true };
    }   
    return null;   
}

