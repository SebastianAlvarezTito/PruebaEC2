import { Routes } from '@angular/router';
import { Dashboard } from './features/dashboard/dashboard';
import { Inventario } from './features/inventario/inventario';

export const routes: Routes = [
  { path: 'dashboard', component: Dashboard },
  { path: 'inventario', component: Inventario },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];