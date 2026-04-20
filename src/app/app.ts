import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { TechsphereService } from './services/techsphere';

/**
 * Componente raíz de la aplicación
 * Demuestra: Composición de componentes, inyección de servicios
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  title = 'TechSphere';

  constructor(private techService: TechsphereService) {}

  /** Carga inicial de servicios al arrancar la app */
  ngOnInit(): void {
    this.techService.loadServices();
  }
}
