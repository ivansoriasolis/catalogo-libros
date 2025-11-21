export interface Libro {
    id?: string;
    titulo: string;
    autor: string;
    anio: number;
    descripcion: string;
    fechaPublicacion: Date;
    imagenUrl?: string;  
    propietarioId?: string;  
}
