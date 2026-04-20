import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechsphereService } from '../../services/techsphere';
import { Service } from '../../models/service';

/**
 * Componente Favoritos
 * Demuestra: Suscripción a Observables, Event binding, @for, @if, @empty
 */
@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './favoritos.html',
  styleUrl: './favoritos.css'
})
export class Favoritos implements OnInit {
  favServices: Service[] = [];

  constructor(private techService: TechsphereService) {}

  ngOnInit(): void {
    this.techService.favorites$.subscribe(favIds => {
      this.favServices = favIds
        .map(id => this.techService.getServiceById(id))
        .filter((s): s is Service => s !== undefined);
    });
  }

  onRemove(id: number): void { this.techService.removeFavorite(id); }
  onClearAll(): void { if (confirm('¿Eliminar todos los favoritos?')) this.techService.clearFavorites(); }
  formatPrice(p: number): string { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(p); }
  getTagClass(cat: string): string { const m: any = { Web:'tag-blue', Mobile:'tag-purple', Cloud:'tag-green', IA:'tag-orange', Security:'tag-red', DevOps:'tag-cyan' }; return m[cat]||'tag-blue'; }
}
