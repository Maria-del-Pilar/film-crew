
import { useParams, Link } from "react-router-dom";
import Navbar from "./components/Navbar";

// Datos de ejemplo para los proyectos audiovisuales.
const proyectos = [
    {
        id: "1",
        titulo: "Cortometraje",
        descripcion:
            "Proyecto audiovisual que busca integrantes para la producción de un cortometraje.",
        tipo: "Cortometraje",
        roles: "Dirección, fotografía y edición",
    },
    {
        id: "2",
        titulo: "Documental",
        descripcion:
            "Proyecto documental en búsqueda de colaboradores para producción y edición.",
        tipo: "Documental",
        roles: "Producción, cámara y montaje",
    },
    {
        id: "3",
        titulo: "Videoclip",
        descripcion:
            "Producción audiovisual para un videoclip que requiere diferentes perfiles creativos.",
        tipo: "Videoclip musical",
        roles: "Dirección, fotografía y dirección de arte",
    },
];

function DetalleProyecto() {
    const { id } = useParams();

    const proyecto = proyectos.find(
        (proyecto) => proyecto.id === id
    );

    if (!proyecto) {
        return (
            <main className="container py-5">
                <h1>Proyecto no encontrado</h1>
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
                </div>

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
