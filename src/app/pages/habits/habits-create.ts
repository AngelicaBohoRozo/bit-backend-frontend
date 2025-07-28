import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-habits-create',
  templateUrl: './habits-create.html',
  styleUrls: ['./habits-create.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ]
})
export class HabitsCreateComponent {
  nuevoHabito = {
    nombre: '',
    descripcion: '',
    categoria: '',
    frecuencia: ''
  };

  constructor(private http: HttpClient, private router: Router) {}

  crearHabito(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/api/habits', this.nuevoHabito, { headers }).subscribe({
      next: () => {
        alert('Hábito creado exitosamente');
        this.router.navigate(['/mis-habitos']);
      },
      error: err => {
        console.error('Error al crear hábito:', err);
        alert('No se pudo crear el hábito');
      }
    });
  }

  volverAMisHabitos(): void {
    this.router.navigate(['/mis-habitos']);
  }
}