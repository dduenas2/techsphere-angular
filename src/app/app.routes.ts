import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Servicios } from './pages/servicios/servicios';
import { Detalle } from './pages/detalle/detalle';
import { Favoritos } from './pages/favoritos/favoritos';
import { Contacto } from './pages/contacto/contacto';
import { Gestion } from './pages/gestion/gestion';
import { Nosotros } from './pages/nosotros/nosotros';

/**
 * Configuración de rutas de la aplicación
 * Demuestra: Angular Router con rutas parametrizadas
 */
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'servicios', component: Servicios },
  { path: 'detalle/:id', component: Detalle },
  { path: 'favoritos', component: Favoritos },
  { path: 'contacto', component: Contacto },
  { path: 'gestion', component: Gestion },
  { path: 'nosotros', component: Nosotros },
  { path: '**', redirectTo: '' }
];
