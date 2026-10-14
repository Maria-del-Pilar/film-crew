
import { useState } from "react";

function SearchBar({ onSearch }) {
    const [busqueda, setBusqueda] = useState("");

    // Actualiza el texto y comunica la búsqueda al componente padre.
    function manejarCambio(event) {
        const texto = event.target.value;
        setBusqueda(texto);
        onSearch(texto);
    }

    return (
        <div className="mb-4">
            <label htmlFor="buscarProyecto" className="form-label">
                Buscar proyectos
            </label>

            <input
                id="buscarProyecto"
                type="search"
                className="form-control"
                placeholder="Ej. cortometraje, documental..."
                value={busqueda}
                onChange={manejarCambio}
            />
        </div>
    );
}

export default SearchBar;
