import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from './layout/navbar';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navbar],
  template: `
    <div *ngIf="loadingService.isLoading()" class="global-loader">
      <div class="progress-line"></div>
    </div>

    <app-navbar></app-navbar>

    <main class="main-container">
      <div class="page-wrapper">
        <router-outlet></router-outlet>
      </div>
    </main>

    <footer class="app-footer">
      <div class="footer-content">
        <p>&copy; 2026 Bodega Peirano | Sistema de Gestión v3.0</p>
        <span class="status-indicator">
          <span class="dot"></span> Sistema Operativo
        </span>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    /* Estilos del Loader Superior */
    .global-loader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 4px;
      z-index: 9999;
      background: rgba(59, 130, 246, 0.1);
      overflow: hidden;
    }
    .progress-line {
      width: 40%;
      height: 100%;
      background: #3b82f6;
      box-shadow: 0 0 10px #3b82f6;
      animation: loading-anim 1.5s infinite ease-in-out;
    }

    @keyframes loading-anim {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(300%); }
    }

    /* Estructura del Contenido */
    .main-container {
      flex: 1;
      background-color: #f8fafc;
    }
    .page-wrapper {
      max-width: 1400px;
      margin: 0 auto;
      padding: 20px;
    }

    /* Estilos del Footer */
    .app-footer {
      background: #1e293b;
      color: #94a3b8;
      padding: 1.5rem;
      border-top: 1px solid #334155;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      font-size: 0.85rem;
    }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #10b981;
    }
    .dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 5px #10b981;
    }
  `]
})
export class AppComponent {
  // Inyección del servicio para que el template detecte isLoading()
  public loadingService = inject(LoadingService);
}