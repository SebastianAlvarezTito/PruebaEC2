import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <span class="logo">🏪</span>
        <span class="title">Bodega Peirano</span>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/inventario" routerLinkActive="active">Inventario</a></li>
      </ul>
      <div class="user-profile">
        <span class="role-badge">Admin</span>
        <span class="user-name">Sebastian Alvarez</span>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: #1e293b;
      color: white;
      padding: 0.75rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    .nav-brand { display: flex; align-items: center; gap: 0.75rem; }
    .logo { font-size: 1.5rem; }
    .title { font-weight: 700; font-size: 1.25rem; letter-spacing: -0.5px; }
    .nav-links { display: flex; list-style: none; gap: 1.5rem; margin: 0; padding: 0; }
    .nav-links a { 
      color: #94a3b8; 
      text-decoration: none; 
      font-weight: 500; 
      transition: all 0.3s;
      padding: 0.5rem 1rem;
      border-radius: 6px;
    }
    .nav-links a:hover { color: white; background: rgba(255,255,255,0.1); }
    .active { color: white !important; background: #3b82f6 !important; }
    .user-profile { display: flex; align-items: center; gap: 1rem; }
    .role-badge { background: #3b82f6; font-size: 0.75rem; padding: 2px 8px; border-radius: 12px; }
    .user-name { font-size: 0.9rem; color: #cbd5e1; }
  `]
})
export class Navbar {}