import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-perfil',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class PerfilComponent {
  nombre = '';
  email = '';

  constructor(private http: HttpClient) {
    this.cargarPerfil();
  }

  cargarPerfil() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.get<any>('http://localhost:3000/api/users/perfil', {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(data => {
        this.nombre = data.nombre;
        this.email = data.email;
      });
    }
  }

  guardarPerfil() {
    const token = localStorage.getItem('token');
    if (token) {
      this.http.put<any>('http://localhost:3000/api/users/perfil', {
        nombre: this.nombre,
        email: this.email
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe(() => {
        alert('Perfil actualizado con éxito');
      });
    }
  }
}