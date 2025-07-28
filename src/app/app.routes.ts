import { Routes } from '@angular/router';

import { LoginComponent } from './pages/auth/login/login';
import { RegisterComponent } from './pages/auth/register/register';
import { HabitosComponent } from './pages/habits/habits';
import { PerfilComponent } from './pages/profile/profile';
import { GraficasComponent } from './pages/impact/impact';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'habitos', component: HabitosComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'graficas', component: GraficasComponent },

  {
    path: 'mis-habitos',
    loadComponent: () =>
      import('./pages/habits/habits-list').then(m => m.HabitsListComponent)
  },
  {
    path: 'crear-habito',
    loadComponent: () =>
      import('./pages/habits/habits-create').then(m => m.HabitsCreateComponent)
  },

  { path: '**', redirectTo: 'login' }
];