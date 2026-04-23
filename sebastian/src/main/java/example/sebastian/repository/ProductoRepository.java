package example.sebastian.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import example.sebastian.model.Producto;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Integer> {

    // Buscar productos por nombre (útil para el buscador del frontend)
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    // Buscar productos por categoría
    List<Producto> findByCategoriaId(Integer idCategory);

    // Buscar solo productos activos
    List<Producto> findByStatusTrue();
    
    // Buscar por SKU (para escáner de códigos o búsquedas exactas)
    Producto findBySku(String sku);
}