import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../data/models/producto';
import { SummaryCards } from '../../shared/components/summary-cards';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, SummaryCards],
  template: `
    <div class="dashboard-container">
      <app-summary-cards 
        [totalItems]="productos.length"
        [lowStockItems]="obtenerStockBajo()"
        [totalValue]="obtenerInversionTotal()">
      </app-summary-cards>

      <div class="table-card">
        <div class="table-header">
          <h2>Listado de Productos</h2>
          <button class="btn-refresh" (click)="cargarProductos()">Refrescar</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of productos">
              <td class="name-cell">
                <span class="product-name">{{ p.nombre }}</span>
                <span class="product-desc">{{ p.descripcion }}</span>
              </td>
              <td>{{ p.precio | currency:'PEN' }}</td>
              <td>
                <span class="stock-tag" [ngClass]="{'danger': p.stock < 5}">
                  {{ p.stock }} unidades
                </span>
              </td>
              <td>
                <span class="status-pill" [ngClass]="p.estado ? 'active' : 'inactive'">
                  {{ p.estado ? 'Activo' : 'Agotado' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styleUrls: ['./inventario.scss']
})
export class Inventario implements OnInit {
  private service = inject(ProductoService);
  productos: Producto[] = [];

  ngOnInit() { this.cargarProductos(); }

  cargarProductos() {
    this.service.getListProductos().subscribe(data => this.productos = data);
  }

  obtenerStockBajo() {
    return this.productos.filter(p => p.stock < 5).length;
  }

  obtenerInversionTotal() {
    return this.productos.reduce((acc, p) => acc + (p.precio * p.stock), 0);
  }
}