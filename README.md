
# TechSphere — Plataforma de Servicios Digitales (Angular)



## Descripción

Aplicación web SPA desarrollada con Angular 21 para la gestión y exploración de servicios tecnológicos digitales.



## Demo

- **Repositorio:** [GitHub](https://github.com/dduenas2/techsphere-angular)

- **Despliegue:** [GitHub Pages](https://dduenas2.github.io/techsphere-angular/)



## Tecnologías

- Angular 21 (Standalone Components)

- TypeScript 5.8

- RxJS (Observables, BehaviorSubject)

- Angular Router (Navegación SPA)

- FormsModule (Two-Way Binding)

- HttpClient (Carga de datos)

- Bootstrap 5.3

- localStorage (Persistencia)



## Conceptos Angular Demostrados

- Componentes standalone con templates y estilos

- Interpolation binding {{ }}

- Property binding [src], [class], [disabled]

- Event binding (click), (input), (ngSubmit)

- Two-way binding [(ngModel)]

- Servicios inyectables con @Injectable

- Angular Router con rutas parametrizadas

- Observables y BehaviorSubject (RxJS)

- AsyncPipe para datos reactivos

- Control flow: @for, @if, @empty



## Estructura del Proyecto

src/app/

- components/ — Navbar, Footer (compartidos)

- models/ — Interfaz Service (TypeScript)

- pages/ — 7 páginas: Home, Servicios, Detalle, Favoritos, Contacto, Gestión, Nosotros

- services/ — TechsphereService (lógica centralizada)

- app.routes.ts — Configuración de rutas

- app.config.ts — Providers: Router, HttpClient



## Ejecución Local

npm install

ng serve

Abrir http://localhost:4200



## Autor

David Alejandro Dueñas C — Módulo Desarrollo de Front-End — 2026

