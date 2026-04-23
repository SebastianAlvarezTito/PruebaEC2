export interface Producto {
    idProducto?: number; // El ? indica que es opcional (para cuando creamos uno nuevo)
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    estado: boolean;
    idCategoria: number;
}