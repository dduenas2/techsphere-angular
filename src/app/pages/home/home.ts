import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TechsphereService } from '../../services/techsphere';
import { Service } from '../../models/service';

/**
 * Componente Home (Página de Inicio)
 * Demuestra: Property Binding, Event Binding, ngOnInit, @for, @if
 */
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  /** Servicios destacados - Property binding con @for */
  featuredServices: Service[] = [];

  /** Contadores de categorías - Interpolation binding */
  categoryCounts: { [key: string]: number } = {};

  constructor(private techService: TechsphereService) {}

  ngOnInit(): void {
    // Suscripción al observable de servicios
    this.techService.services$.subscribe(services => {
      this.featuredServices = services.filter(s => s.estado === 'activo').slice(0, 6);
      this.countCategories(services);
    });
  }

  /** Cuenta servicios por categoría */
  private countCategories(services: Service[]): void {
    this.categoryCounts = {};
    services.forEach(s => {
      this.categoryCounts[s.categoria] = (this.categoryCounts[s.categoria] || 0) + 1;
    });
  }

  /** Event binding: toggle de favorito */
  onToggleFavorite(serviceId: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const added = this.techService.toggleFavorite(serviceId);
    // Angular detecta el cambio automáticamente
  }

  /** Verifica si un servicio está en favoritos */
  isFavorite(serviceId: number): boolean {
    return this.techService.isFavorite(serviceId);
  }

  /** Formatea precio */
  formatPrice(price: number): string {
    return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  }

  /** Formatea tipo de precio para display */
  formatPriceType(tipoPrecio: string): string {
    return tipoPrecio.replace('USD / ', '/ ');
  }

  /** Retorna clase CSS del tag según categoría */
  getTagClass(category: string): string {
    const map: { [key: string]: string } = { Web: 'tag-blue', Mobile: 'tag-purple', Cloud: 'tag-green', IA: 'tag-orange', Security: 'tag-red', DevOps: 'tag-cyan' };
    return map[category] || 'tag-blue';
  }
}
