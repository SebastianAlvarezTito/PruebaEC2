package example.sebastian.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import example.sebastian.model.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
    // Método para buscar solo categorías activas
    List<Category> findByStatusTrue();
    
    // Buscar por código de categoría (ej. 'VIN', 'PIS')
    Category findByCategoryCode(String code);
}