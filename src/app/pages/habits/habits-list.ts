import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-habits-list',
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './habits-list.html',
  styleUrls: ['./habits-list.css']
})
export class HabitsListComponent implements OnInit {
  habitos: any[] = [];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarHabitos();
  }

  cargarHabitos(): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>('http://localhost:3000/api/habits', { headers }).subscribe({
      next: data => {
        this.habitos = data;
        console.log('Hábitos recibidos:', data);
      },
      error: err => {
        console.error('Error al cargar hábitos:', err);
        alert('Error al cargar hábitos');
      }
    });
  }

  eliminarHabito(id: string): void {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('No estás autenticado');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`http://localhost:3000/api/habits/${id}`, { headers }).subscribe({
      next: () => {
        this.habitos = this.habitos.filter(h => h._id !== id);
        console.log('Hábito eliminado:', id);
      },
      error: err => {
        console.error('Error al eliminar hábito:', err);
        alert('No se pudo eliminar el hábito');
      }
    });
  }

  irACrearHabito(): void {
    this.router.navigate(['/crear-habito']);
  }
}