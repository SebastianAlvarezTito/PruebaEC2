import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-summary-cards',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cards-grid">
      <div class="card blue">
        <div class="icon">📦</div>
        <div class="info">
          <h3>Total Productos</h3>
          <p>{{ totalItems }}</p>
        </div>
      </div>
      <div class="card orange">
        <div class="icon">⚠️</div>
        <div class="info">
          <h3>Stock Crítico</h3>
          <p>{{ lowStockItems }}</p>
        </div>
      </div>
      <div class="card green">
        <div class="icon">💰</div>
        <div class="info">
          <h3>Valor Inventario</h3>
          <p>{{ totalValue | currency:'PEN' }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
    .card { background: white; padding: 1.5rem; border-radius: 12px; display: flex; align-items: center; gap: 1rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); border-left: 5px solid #ddd; }
    .blue { border-left-color: #3b82f6; }
    .orange { border-left-color: #f59e0b; }
    .green { border-left-color: #10b981; }
    .icon { font-size: 2rem; }
    h3 { margin: 0; color: #64748b; font-size: 0.9rem; text-transform: uppercase; }
    p { margin: 0; font-size: 1.5rem; font-weight: 700; color: #1e293b; }
  `]
})
export class SummaryCards {
  @Input() totalItems: number = 0;
  @Input() lowStockItems: number = 0;
  @Input() totalValue: number = 0;
}