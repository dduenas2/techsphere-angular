import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TechsphereService } from '../../services/techsphere';
import { Service } from '../../models/service';

/**
 * Componente Gestión de Servicios (Mini CRUD)
 * Demuestra: Two-way binding, Event binding, @for, @if, Crear/Eliminar
 */
@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './gestion.html',
  styleUrl: './gestion.css'
})
export class Gestion implements OnInit {
  services: Service[] = [];
  filteredServices: Service[] = [];

  /** Two-way binding para filtros */
  searchQuery = '';
  categoryFilter = 'all';
  statusFilter = 'all';

  /** Two-way binding para formulario de creación */
  newService = { nombre: '', categoria: '', descripcionCorta: '', precio: 0, tipoPrecio: 'USD / proyecto', imagen: '' };

  /** Estado de modales */
  showCreateModal = false;
  showDeleteModal = false;
  deleteTarget: Service | null = null;
  createSubmitted = false;

  /** KPIs reactivos */
  totalServices = 0;
  activeCount = 0;
  inactiveCount = 0;
  categoryCount = 0;

  constructor(private techService: TechsphereService) {}

  ngOnInit(): void {
    this.techService.services$.subscribe(services => {
      this.services = services;
      this.updateKPIs();
      this.applyFilters();
    });
  }

  updateKPIs(): void {
    this.totalServices = this.services.length;
    this.activeCount = this.services.filter(s => s.estado === 'activo').length;
    this.inactiveCount = this.totalServices - this.activeCount;
    this.categoryCount = new Set(this.services.map(s => s.categoria)).size;
  }

  applyFilters(): void {
    let result = this.services;
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(s => s.nombre.toLowerCase().includes(q));
    }
    if (this.categoryFilter !== 'all') result = result.filter(s => s.categoria === this.categoryFilter);
    if (this.statusFilter !== 'all') result = result.filter(s => s.estado === this.statusFilter);
    this.filteredServices = result;
  }

  /** Event binding: crear servicio */
  onCreate(): void {
    this.createSubmitted = true;
    if (!this.newService.nombre || !this.newService.categoria || !this.newService.descripcionCorta || !this.newService.precio) return;

    this.techService.createService(this.newService);
    this.newService = { nombre: '', categoria: '', descripcionCorta: '', precio: 0, tipoPrecio: 'USD / proyecto', imagen: '' };
    this.showCreateModal = false;
    this.createSubmitted = false;
  }

  /** Event binding: confirmar eliminación */
  onDelete(): void {
    if (this.deleteTarget) {
      this.techService.deleteService(this.deleteTarget.id);
      this.deleteTarget = null;
      this.showDeleteModal = false;
    }
  }

  openDeleteModal(service: Service): void { this.deleteTarget = service; this.showDeleteModal = true; }
  isUserService(id: number): boolean { return this.techService.isUserService(id); }
  getTagClass(cat: string): string { const m: any = { Web:'tag-blue', Mobile:'tag-purple', Cloud:'tag-green', IA:'tag-orange', Security:'tag-red', DevOps:'tag-cyan' }; return m[cat]||'tag-blue'; }
  formatPrice(p: number): string { return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(p); }
}
