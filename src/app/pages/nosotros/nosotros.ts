import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Componente Nosotros - Página informativa */
@Component({
  selector: 'app-nosotros',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nosotros.html',
  styleUrl: './nosotros.css'
})
export class Nosotros {
  currentYear = new Date().getFullYear();
}
