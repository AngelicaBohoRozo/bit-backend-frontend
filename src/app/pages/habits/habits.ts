import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-habitos',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './habits.html',
  styleUrls: ['./habits.css']
})
export class HabitosComponent {
  nombre = '';
  descripcion = '';
  categoria = '';
  frecuencia = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  agregarHabito() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No estás autenticado. Por favor inicia sesión.');
      return;
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    };

    this.http.post('http://localhost:3000/api/habits', {
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      frecuencia: this.frecuencia
    }, { headers }).subscribe({
      next: () => {
        this.snackBar.open('✅ Hábito registrado con éxito', 'Cerrar', { duration: 3000 });
        // Limpiar formulario
        this.nombre = '';
        this.descripcion = '';
        this.categoria = '';
        this.frecuencia = '';
      },
      error: (err) => {
        console.error('Error:', err);
        this.snackBar.open('❌ Error al registrar hábito', 'Cerrar', { duration: 3000 });
      }
    });
  }
  
  irAMisHabitos() {
    this.router.navigate(['/mis-habitos']);
  }
}