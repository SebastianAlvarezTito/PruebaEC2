import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../data/models/producto';
import { SummaryCards } from '../../shared/components/summary-cards';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SummaryCards],
  template: `
    <div class="dashboard-wrapper">
      <header class="dashboard-header">
        <h1>Panel de Control - Bodega Peirano</h1>
        <p>Análisis de inventario en tiempo real | {{ hoy | date:'fullDate' }}</p>
      </header>

      <app-summary-cards 
        [totalItems]="productos.length"
        [lowStockItems]="getBajoStock()"
        [totalValue]="getInversion()">
      </app-summary-cards>

      <div class="main-grid">
        <div class="chart-card">
          <h3>Salud del Inventario</h3>
          <div class="stat-row">
            <span>Productos con Stock Óptimo</span>
            <div class="progress-bg">
              <div class="progress-fill green" [style.width.%]="getPorcentajeOk()"></div>
            </div>
            <span class="pct">{{ getPorcentajeOk() | number:'1.0-0' }}%</span>
          </div>
          
          <div class="stat-row">
            <span>Productos en Alerta (Bajo Stock)</span>
            <div class="progress-bg">
              <div class="progress-fill red" [style.width.%]="getPorcentajeCritico()"></div>
            </div>
            <span class="pct">{{ getPorcentajeCritico() | number:'1.0-0' }}%</span>
          </div>
        </div>

        <div class="info-card">
          <h3>Acciones del Sistema</h3>
          <div class="actions-list">
            <button class="action-btn">📦 Generar Orden de Compra</button>
            <button class="action-btn secondary">📊 Exportar a Excel</button>
            <button class="action-btn danger">⚠️ Ver Alertas Críticas</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-wrapper { padding: 30px; background: #f1f5f9; min-height: 100vh; font-family: 'Inter', sans-serif; }
    .dashboard-header h1 { color: #0f172a; margin-bottom: 5px; font-weight: 800; }
    .dashboard-header p { color: #64748b; margin-bottom: 30px; }

    .main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 25px; margin-top: 20px; }
    .chart-card, .info-card { background: white; padding: 25px; border-radius: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
    h3 { color: #334155; font-size: 1.1rem; margin-bottom: 20px; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; }

    .stat-row { margin-bottom: 20px; }
    .stat-row span { display: block; margin-bottom: 8px; font-size: 0.9rem; color: #475569; }
    .progress-bg { background: #e2e8f0; height: 12px; border-radius: 6px; overflow: hidden; margin-bottom: 5px; }
    .progress-fill { height: 100%; transition: width 0.8s ease-in-out; }
    .green { background: #10b981; }
    .red { background: #ef4444; }
    .pct { font-weight: bold; color: #1e293b; text-align: right; }

    .actions-list { display: flex; flex-direction: column; gap: 12px; }
    .action-btn { padding: 12px; border-radius: 8px; border: none; font-weight: 600; cursor: pointer; transition: 0.2s; text-align: left; }
    .action-btn:hover { transform: translateX(5px); }
    .action-btn:not(.secondary):not(.danger) { background: #2563eb; color: white; }
    .secondary { background: #f1f5f9; color: #475569; }
    .danger { background: #fee2e2; color: #dc2626; }
  `]
})
export class Dashboard implements OnInit {
  private service = inject(ProductoService);
  productos: Producto[] = [];
  hoy = new Date();

  ngOnInit() {
    this.service.getListProductos().subscribe(data => {
      this.productos = data;
    });
  }

  getBajoStock() { return this.productos.filter(p => p.stock < 5).length; }
  
  getInversion() { 
    return this.productos.reduce((acc, p) => acc + (p.precio * p.stock), 0); 
  }

  getPorcentajeOk() {
    if (this.productos.length === 0) return 0;
    return ((this.productos.length - this.getBajoStock()) / this.productos.length) * 100;
  }

  getPorcentajeCritico() {
    if (this.productos.length === 0) return 0;
    return (this.getBajoStock() / this.productos.length) * 100;
  }
}