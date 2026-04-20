import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TechsphereService } from '../../services/techsphere';
import { Service } from '../../models/service';

/**
 * Componente Detalle del Servicio
 * Demuestra: ActivatedRoute (parámetros de URL), Property/Event binding, @if, @for
 */
@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle.html',
  styleUrl: './detalle.css'
})
export class Detalle implements OnInit {
  service: Service | undefined;
  relatedServices: Service[] = [];

  constructor(private route: ActivatedRoute, private techService: TechsphereService) {}

  ngOnInit(): void {
    // Suscripción al parámetro de ruta :id
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      this.techService.services$.subscribe(() => {
        this.service = this.techService.getServiceById(id);
        if (this.service) {
          this.relatedServices = this.techService.filterByCategory(this.service.categoria)
            .filter(s => s.id !== id).slice(0, 3);
        }
      });
    });
  }

  onToggleFavorite(): void {
    if (this.service) this.techService.toggleFavorite(this.service.id);
  }

  isFavorite(): boolean { return this.service ? this.techService.isFavorite(this.service.id) : false; }
  formatPrice(p: number): string { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(p); }
  getTagClass(cat: string): string {
    const m: any = { Web: 'tag-blue', Mobile: 'tag-purple', Cloud: 'tag-green', IA: 'tag-orange', Security: 'tag-red', DevOps: 'tag-cyan' };
    return m[cat] || 'tag-blue';
  }
}
