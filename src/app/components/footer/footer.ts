import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/** Componente Footer reutilizable */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear = new Date().getFullYear();
}
