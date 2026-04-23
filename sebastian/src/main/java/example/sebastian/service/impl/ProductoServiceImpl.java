package example.sebastian.service.impl;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import example.sebastian.model.Producto;
import example.sebastian.repository.ProductoRepository;
import example.sebastian.service.ProductoService;

@Service
public class ProductoServiceImpl implements ProductoService {

    @Autowired
    private ProductoRepository repository;

    @Override
    @Transactional(readOnly = true)
    public List<Producto> listarTodos() {
        return repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public List<Producto> listarActivos() {
        return repository.findByStatusTrue();
    }

    @Override
    @Transactional(readOnly = true)
    public Producto obtenerPorId(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Producto no encontrado con ID: " + id));
    }

    @Override
    @Transactional
    public Producto guardar(Producto producto) {
        // Regla de negocio: Validar que el precio no sea cero o negativo
        if (producto.getPrecio() == null || producto.getPrecio().doubleValue() <= 0) {
            throw new IllegalArgumentException("El precio debe ser mayor a cero");
        }
        return repository.save(producto);
    }

    @Override
    @Transactional
    public Producto actualizar(Integer id, Producto producto) {
        Producto existente = obtenerPorId(id);
        existente.setNombre(producto.getNombre());
        existente.setDescripcion(producto.getDescripcion());
        existente.setPrecio(producto.getPrecio());
        existente.setSku(producto.getSku());
        existente.setCategoria(producto.getCategoria());
        return repository.save(existente);
    }

    @Override
    @Transactional
    public void eliminar(Integer id) {
        // En proyectos de alto nivel, no borramos el dato, cambiamos su estado
        Producto producto = obtenerPorId(id);
        producto.setStatus(false);
        repository.save(producto);
    }

    @Override
    public List<Producto> buscarPorNombre(String nombre) {
        return repository.findByNombreContainingIgnoreCase(nombre);
    }

    @Override
    public List<Producto> buscarPorCategoria(Integer idCategory) {
        return repository.findByCategoriaId(idCategory);
    }
}