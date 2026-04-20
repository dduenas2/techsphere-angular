/**
 * Interfaz que define la estructura de un Servicio
 * Representa cada servicio tecnológico en la plataforma TechSphere
 */
export interface Service {
  id: number;
  nombre: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  categoria: string;
  tecnologias: string[];
  precio: number;
  tipoPrecio: string;
  imagen: string;
  icono: string;
  badge: string;
  rating: number;
  resenas: number;
  clientes: number;
  entrega: string;
  estado: string;
  fechaCreacion: string;
  caracteristicas: string[];
}
