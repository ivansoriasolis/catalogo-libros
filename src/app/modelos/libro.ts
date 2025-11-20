export interface Libro {
    id?:string;
    titulo: string;
    autor: string;
    anio: number;
    descripcion: string;
    fechaPublicacion: Date;
    imagenUrl?: string; // URL de la imagen de portada del libro
    propietarioId?: string; // ID del usuario que agregó el libro
}
