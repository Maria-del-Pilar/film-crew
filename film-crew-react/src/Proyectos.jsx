import { useState } from "react";
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";
import SearchBar from "./components/SearchBar";

function Proyectos({ proyectos }) {
    const [busqueda, setBusqueda] = useState("");

    const proyectosFiltrados = proyectos.filter((proyecto) => {
        const texto = busqueda.toLowerCase();

        return (
            proyecto.titulo.toLowerCase().includes(texto) ||
            proyecto.descripcion.toLowerCase().includes(texto) ||
            proyecto.tipo.toLowerCase().includes(texto) ||
            proyecto.ubicacion.toLowerCase().includes(texto)
        );
    });

    return (
        <>
            <Navbar />

            <main className="container py-5">
                <h1 className="text-center mb-4">Proyectos</h1>

                <SearchBar onSearch={setBusqueda} />

                <div className="row g-4 justify-content-center">
                    {proyectosFiltrados.length > 0 ? (
                        proyectosFiltrados.map((proyecto) => (
                            <div
                                className="col-md-4 d-flex justify-content-center"
                                key={proyecto.id}
                            >
                                <ProjectCard {...proyecto} />
                            </div>
                        ))
                    ) : (
                        <div className="col-12 text-center">
                            <p>
                                No se encontraron proyectos que coincidan
                                con tu búsqueda.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}

export default Proyectos;

