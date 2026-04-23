package example.sebastian.service;

import java.util.List;

import example.sebastian.model.Producto;

public interface ProductoService {
    List<Producto> listarTodos();
    List<Producto> listarActivos();
    Producto obtenerPorId(Integer id);
    Producto guardar(Producto producto);
    Producto actualizar(Integer id, Producto producto);
    void eliminar(Integer id); // Eliminación lógica (status = false)
    
    // Métodos para el buscador y filtros de Angel y Valeriano
    List<Producto> buscarPorNombre(String nombre);
    List<Producto> buscarPorCategoria(Integer idCategory);
}