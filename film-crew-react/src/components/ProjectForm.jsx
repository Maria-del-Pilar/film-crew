
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm({ onCrearProyecto}) {

    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        titulo: "",
        tipo: "",
        descripcion: "",
        roles: "",
        ubicacion: "",
    });

    const [mensaje, setMensaje] = useState("");

    // Actualiza el campo que el usuario modifica.
    function manejarCambio(event) {
        const { name, value } = event.target;

        setFormulario({
            ...formulario,
            [name]: value,
        });

        setMensaje("");
    }

    // Comprueba los campos y muestra una confirmación.
    function manejarEnvio(event) {
    event.preventDefault();

    onCrearProyecto(formulario);

    setMensaje(
        `El proyecto "${formulario.titulo}" se publicó correctamente.`
    );

    setFormulario({
        titulo: "",
        tipo: "",
        descripcion: "",
        roles: "",
        ubicacion: "",
    });
    }

    return (
        <section className="container py-5">
            <h1 className="mb-4">Publicar un proyecto</h1>

            <button
                type="button"
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate("/proyectos")}
            >
                Volver a proyectos
            </button>

            <form onSubmit={manejarEnvio}>
                <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">
                        Título del proyecto
                    </label>
                    <input
                        id="titulo"
                        name="titulo"
                        type="text"
                        className="form-control"
                        value={formulario.titulo}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">
                        Tipo de producción
                    </label>
                    <select
                        id="tipo"
                        name="tipo"
                        className="form-select"
                        value={formulario.tipo}
                        onChange={manejarCambio}
                        required
                    >
                        <option value="">Selecciona una opción</option>
                        <option value="Cortometraje">Cortometraje</option>
                        <option value="Largometraje">Largometraje</option>
                        <option value="Documental">Documental</option>
                        <option value="Videoclip">Videoclip</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">
                        Descripción
                    </label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        className="form-control"
                        rows="4"
                        value={formulario.descripcion}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="roles" className="form-label">
                        Roles o colaboradores que buscas
                    </label>
                    <input
                        id="roles"
                        name="roles"
                        type="text"
                        className="form-control"
                        placeholder="Ej. dirección, fotografía y edición"
                        value={formulario.roles}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="ubicacion" className="form-label">
                        Ubicación
                    </label>
                    <input
                        id="ubicacion"
                        name="ubicacion"
                        type="text"
                        className="form-control"
                        placeholder="Ej. Duitama, Colombia"
                        value={formulario.ubicacion}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Publicar proyecto
                </button>
            </form>

                {mensaje && (
                    <div className="alert alert-success mt-4" role="status">
                        <p className="mb-3">{mensaje}</p>

                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate("/proyectos")}
                        >
                            Ir a proyectos
                        </button>
                    </div>
                )}

        </section>
    );
}

export default ProjectForm;
