import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { TechsphereService } from '../../services/techsphere';

/**
 * Componente Navbar
 * Demuestra: RouterLink, RouterLinkActive, Async Pipe, inject()
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  private techService = inject(TechsphereService);

  /** Observable del contador de favoritos */
  favCount$ = this.techService.favoritesCount$;
}
