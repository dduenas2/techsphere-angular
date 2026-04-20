import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TechsphereService } from '../../services/techsphere';
import { Service } from '../../models/service';

/**
 * Componente Contacto con Formulario
 * Demuestra: Two-way binding [(ngModel)], Template-driven forms, validaciones
 */
@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto implements OnInit {
  /** Modelo del formulario - Two-way binding con [(ngModel)] */
  formData = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    servicio: '',
    presupuesto: '',
    mensaje: '',
    terms: false
  };

  /** Estado del formulario */
  submitted = false;
  success = false;
  loading = false;

  /** Lista de servicios para el dropdown */
  servicesList: Service[] = [];

  constructor(private techService: TechsphereService) {}

  ngOnInit(): void {
    this.techService.services$.subscribe(services => {
      this.servicesList = services;
    });
  }

  /** Valida formato de email */
  isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /** Verifica si el formulario es válido */
  isFormValid(): boolean {
    return this.formData.nombre.trim().length >= 2 &&
      this.formData.apellido.trim().length >= 2 &&
      this.isValidEmail(this.formData.email) &&
      this.formData.servicio !== '' &&
      this.formData.mensaje.trim().length >= 10 &&
      this.formData.terms;
  }

  /** Event binding: submit del formulario */
  onSubmit(): void {
    this.submitted = true;
    if (!this.isFormValid()) return;

    this.loading = true;
    // Simular envío
    setTimeout(() => {
      this.loading = false;
      this.success = true;
      this.formData = { nombre: '', apellido: '', email: '', telefono: '', servicio: '', presupuesto: '', mensaje: '', terms: false };
      this.submitted = false;
    }, 1500);
  }
}
