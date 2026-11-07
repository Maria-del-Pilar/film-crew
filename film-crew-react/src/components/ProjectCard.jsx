
import { Link } from "react-router-dom";

function ProjectCard({ 
                        id, 
                        id_usuario,
                        imagen, 
                        titulo, 
                        descripcion,
                        usuario,
                        onEliminarProyecto,
 }) {
    return (
        <div className="card project-card h-100">
            <img
                src={imagen}
                className="card-img-top project-image"
                alt={titulo}
            />

            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{titulo}</h5>

                <p className="card-text">
                    {descripcion}
                </p>

                <Link
                    to={`/proyectos/${id}`}
                    className="btn btn-primary mt-auto"
                >
                    Ver más
                </Link>

                {usuario &&
                    String(usuario.id_usuario) === String(id_usuario) && (
                        <button
                            className="btn btn-outline-danger mt-2"
                            onClick={async () => {
                                const confirmar = window.confirm(
                                    `¿Estás seguro de eliminar el proyecto "${titulo}"?`
                                );

                                if (confirmar) {
                                    try {
                                        await onEliminarProyecto(id);
                                        window.alert("Proyecto eliminado correctamente.");
                                    } catch (error) {
                                        window.alert(error.message);
                                    }
                                }
                            }}
                        >
                            Eliminar proyecto
                        </button>
                    )}

            </div>
        </div>
    );
}

export default ProjectCard;
