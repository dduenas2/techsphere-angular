import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TechsphereService } from '../../services/techsphere';
import { Service } from '../../models/service';

/**
 * Componente Catálogo de Servicios
 * Demuestra: Two-way binding [(ngModel)], Event binding (input/change), @for
 */
@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './servicios.html',
  styleUrl: './servicios.css'
})
export class Servicios implements OnInit {
  /** Variables de filtro - Two-way binding con [(ngModel)] */
  searchQuery: string = '';
  categoryFilter: string = 'all';
  sortFilter: string = '';

  /** Servicios filtrados para mostrar */
  filteredServices: Service[] = [];

  constructor(private techService: TechsphereService) {}

  ngOnInit(): void {
    this.techService.services$.subscribe(() => this.applyFilters());
  }

  /** Aplica filtros de búsqueda, categoría y ordenamiento */
  applyFilters(): void {
    let results = this.techService.searchServices(this.searchQuery);
    if (this.categoryFilter !== 'all') {
      results = results.filter(s => s.categoria === this.categoryFilter);
    }
    if (this.sortFilter) {
      results = this.techService.sortServices(results, this.sortFilter);
    }
    this.filteredServices = results;
  }

  onToggleFavorite(id: number, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.techService.toggleFavorite(id);
  }

  isFavorite(id: number): boolean { return this.techService.isFavorite(id); }
  formatPrice(p: number): string { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(p); }
  getTagClass(cat: string): string {
    const m: any = { Web: 'tag-blue', Mobile: 'tag-purple', Cloud: 'tag-green', IA: 'tag-orange', Security: 'tag-red', DevOps: 'tag-cyan' };
    return m[cat] || 'tag-blue';
  }
}
