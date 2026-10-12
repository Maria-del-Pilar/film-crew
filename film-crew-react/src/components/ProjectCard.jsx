
import { Link } from "react-router-dom";

function ProjectCard({ id, imagen, titulo, descripcion }) {
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
            </div>
        </div>
    );
}

export default ProjectCard;
