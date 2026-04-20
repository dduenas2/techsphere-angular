import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Service } from '../models/service';

/**
 * Servicio principal de TechSphere
 * Gestiona: carga de datos, favoritos (localStorage), CRUD de servicios
 * Demuestra: Inyección de dependencias, Observables, BehaviorSubject
 */
@Injectable({
  providedIn: 'root'
})
export class TechsphereService {
  // --- Claves de localStorage ---
  private readonly FAVORITES_KEY = 'techsphere_favorites';
  private readonly USER_SERVICES_KEY = 'techsphere_services';

  // --- Subjects reactivos (binding reactivo) ---
  private servicesSubject = new BehaviorSubject<Service[]>([]);
  private favoritesSubject = new BehaviorSubject<number[]>([]);

  /** Observable público de servicios - los componentes se suscriben a este */
  services$ = this.servicesSubject.asObservable();

  /** Observable público de favoritos */
  favorites$ = this.favoritesSubject.asObservable();

  /** Contador reactivo de favoritos para el navbar */
  favoritesCount$ = this.favoritesSubject.pipe(map(favs => favs.length));

  constructor(private http: HttpClient) {
    // Cargar favoritos desde localStorage al iniciar
    this.loadFavoritesFromStorage();
  }

  /**
   * Carga los servicios desde el JSON y combina con los del usuario
   * Demuestra: HttpClient, Observables, async data loading
   */
  loadServices(): void {
    this.http.get<Service[]>('assets/data/services.json').subscribe({
      next: (jsonServices) => {
        const userServices = this.getUserServices();
        const allServices = [...jsonServices, ...userServices];
        this.servicesSubject.next(allServices);
        console.log(`✅ ${allServices.length} servicios cargados`);
      },
      error: (err) => {
        console.error('❌ Error al cargar servicios:', err);
        // Cargar solo servicios del usuario si falla el JSON
        this.servicesSubject.next(this.getUserServices());
      }
    });
  }

  /**
   * Obtiene un servicio por ID
   * Demuestra: Método de búsqueda con tipado fuerte
   */
  getServiceById(id: number): Service | undefined {
    return this.servicesSubject.value.find(s => s.id === id);
  }

  /**
   * Filtra servicios por categoría
   * @param category - Categoría a filtrar, 'all' para todas
   */
  filterByCategory(category: string): Service[] {
    const services = this.servicesSubject.value;
    if (!category || category === 'all') return services;
    return services.filter(s => s.categoria.toLowerCase() === category.toLowerCase());
  }

  /**
   * Busca servicios por texto en nombre, descripción o tecnologías
   */
  searchServices(query: string): Service[] {
    const services = this.servicesSubject.value;
    if (!query) return services;
    const q = query.toLowerCase();
    return services.filter(s =>
      s.nombre.toLowerCase().includes(q) ||
      s.descripcionCorta.toLowerCase().includes(q) ||
      s.categoria.toLowerCase().includes(q) ||
      s.tecnologias.some(t => t.toLowerCase().includes(q))
    );
  }

  /**
   * Ordena servicios por criterio
   */
  sortServices(services: Service[], sortBy: string): Service[] {
    const sorted = [...services];
    switch (sortBy) {
      case 'precio-asc': return sorted.sort((a, b) => a.precio - b.precio);
      case 'precio-desc': return sorted.sort((a, b) => b.precio - a.precio);
      case 'rating': return sorted.sort((a, b) => b.rating - a.rating);
      case 'reciente': return sorted.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime());
      default: return sorted;
    }
  }

  /** Obtiene servicios activos */
  getActiveServices(): Service[] {
    return this.servicesSubject.value.filter(s => s.estado === 'activo');
  }

  /** Obtiene categorías únicas */
  getCategories(): string[] {
    return [...new Set(this.servicesSubject.value.map(s => s.categoria))];
  }

  // ============================================================
  // FAVORITOS (localStorage)
  // ============================================================

  /** Carga favoritos desde localStorage */
  private loadFavoritesFromStorage(): void {
    try {
      const data = localStorage.getItem(this.FAVORITES_KEY);
      const favs = data ? JSON.parse(data) : [];
      this.favoritesSubject.next(favs);
    } catch {
      this.favoritesSubject.next([]);
    }
  }

  /** Guarda favoritos en localStorage */
  private saveFavorites(): void {
    localStorage.setItem(this.FAVORITES_KEY, JSON.stringify(this.favoritesSubject.value));
  }

  /**
   * Agrega o quita un servicio de favoritos (toggle)
   * Demuestra: Data binding reactivo con BehaviorSubject
   * @returns true si se agregó, false si se quitó
   */
  toggleFavorite(serviceId: number): boolean {
    const currentFavs = [...this.favoritesSubject.value];
    const index = currentFavs.indexOf(serviceId);

    if (index === -1) {
      currentFavs.push(serviceId);
      this.favoritesSubject.next(currentFavs);
      this.saveFavorites();
      return true;
    } else {
      currentFavs.splice(index, 1);
      this.favoritesSubject.next(currentFavs);
      this.saveFavorites();
      return false;
    }
  }

  /** Verifica si un servicio está en favoritos */
  isFavorite(serviceId: number): boolean {
    return this.favoritesSubject.value.includes(serviceId);
  }

  /** Elimina un favorito específico */
  removeFavorite(serviceId: number): void {
    const favs = this.favoritesSubject.value.filter(id => id !== serviceId);
    this.favoritesSubject.next(favs);
    this.saveFavorites();
  }

  /** Limpia todos los favoritos */
  clearFavorites(): void {
    this.favoritesSubject.next([]);
    this.saveFavorites();
  }

  // ============================================================
  // CRUD (localStorage)
  // ============================================================

  /** Obtiene servicios creados por el usuario desde localStorage */
  private getUserServices(): Service[] {
    try {
      const data = localStorage.getItem(this.USER_SERVICES_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /**
   * Crea un nuevo servicio
   * Demuestra: Two-way binding → el formulario envía datos al servicio
   */
  createService(serviceData: Partial<Service>): Service {
    const userServices = this.getUserServices();
    const newService: Service = {
      id: Date.now(),
      nombre: serviceData.nombre || '',
      descripcionCorta: serviceData.descripcionCorta || '',
      descripcionCompleta: serviceData.descripcionCorta || '',
      categoria: serviceData.categoria || '',
      tecnologias: [serviceData.categoria || ''],
      precio: serviceData.precio || 0,
      tipoPrecio: serviceData.tipoPrecio || 'USD / proyecto',
      imagen: serviceData.imagen || `https://placehold.co/600x400/1E293B/94A3B8?text=${encodeURIComponent(serviceData.nombre || 'Nuevo')}`,
      icono: 'bi-box',
      badge: 'Nuevo',
      rating: 0,
      resenas: 0,
      clientes: 0,
      entrega: 'Por definir',
      estado: 'activo',
      fechaCreacion: new Date().toISOString().split('T')[0],
      caracteristicas: ['Servicio personalizado', 'Soporte incluido'],
    };

    userServices.push(newService);
    localStorage.setItem(this.USER_SERVICES_KEY, JSON.stringify(userServices));

    // Actualizar el subject con todos los servicios
    const allServices = [...this.servicesSubject.value, newService];
    this.servicesSubject.next(allServices);

    return newService;
  }

  /**
   * Elimina un servicio creado por el usuario
   */
  deleteService(serviceId: number): boolean {
    let userServices = this.getUserServices();
    const initialLen = userServices.length;
    userServices = userServices.filter(s => s.id !== serviceId);

    if (userServices.length < initialLen) {
      localStorage.setItem(this.USER_SERVICES_KEY, JSON.stringify(userServices));
      const allServices = this.servicesSubject.value.filter(s => s.id !== serviceId);
      this.servicesSubject.next(allServices);
      this.removeFavorite(serviceId);
      return true;
    }
    return false;
  }

  /** Verifica si un servicio fue creado por el usuario */
  isUserService(serviceId: number): boolean {
    return serviceId > 1000000000;
  }
}
