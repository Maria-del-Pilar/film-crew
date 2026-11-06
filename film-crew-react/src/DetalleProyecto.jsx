
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import { obtenerProyectoPorId } from "./services/api";

function DetalleProyecto() {
    const { id } = useParams();

    const [proyecto, setProyecto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function cargarProyecto() {
            try {
                const datos = await obtenerProyectoPorId(id);
                setProyecto(datos);
            } catch (error) {
                console.error("Error:", error);
                setError(error.message || "No fue posible cargar el proyecto.");
            } finally {
                setCargando(false);
            }
        }

        cargarProyecto();
    }, [id]);

    if (cargando) {
        return <p className="text-center mt-5">Cargando proyecto...</p>;
    }

    if (error || !proyecto) {
        return (
            <main className="container py-5">
                <h1>Proyecto no encontrado</h1>
                <p>{error || "No se encontró el proyecto solicitado."}</p>
                <Link to="/proyectos" className="btn btn-primary">
                    Volver a proyectos
                </Link>
            </main>
        );
    }

    return (
        <>
            <Navbar />

            <main className="container py-5">
                <h1 className="mb-4">{proyecto.titulo}</h1>

                <div className="card p-4">
                    <h2 className="h5">Descripción del proyecto</h2>
                    <p>{proyecto.descripcion}</p>

                    <h2 className="h5">Tipo de producción</h2>
                    <p>{proyecto.tipo}</p>

                    <h2 className="h5">Roles requeridos</h2>
                    <p>{proyecto.roles}</p>

                    <h2 className="h5">Ubicación</h2>
                    <p>{proyecto.ubicacion}</p>
                </div>

                <Link
                    to={`/proyectos/${proyecto.id_proyecto}/editar`}
                    className="btn btn-primary mt-4 me-2"
                >
                    Editar proyecto
                </Link>

                <Link
                    to="/proyectos"
                    className="btn btn-outline-primary mt-4"
                >
                    Volver a proyectos
                </Link>

            </main>
        </>
    );
}

export default DetalleProyecto;