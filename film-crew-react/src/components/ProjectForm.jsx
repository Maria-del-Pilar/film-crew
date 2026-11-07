
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function ProjectForm({ 
    proyecto, 
    onCrearProyecto, 
    onActualizarProyecto,
    usuario,
    onCerrarSesion 
}) {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        titulo: "",
        tipo: "",
        descripcion: "",
        roles: "",
        ubicacion: "",
        estado: "Activo",
    });

    const [mensaje, setMensaje] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [errorPublicacion, setErrorPublicacion] = useState(false);

    const modoEdicion = Boolean(proyecto);

    useEffect(() => {
        if (proyecto) {
            setFormulario({
                titulo: proyecto.titulo || "",
                tipo: proyecto.tipo || "",
                descripcion: proyecto.descripcion || "",
                roles: proyecto.roles || "",
                ubicacion: proyecto.ubicacion || "",
                estado: proyecto.estado || "Activo",
            });
        }
    }, [proyecto]);

    function manejarCambio(event) {
        const { name, value } = event.target;

        setFormulario({
            ...formulario,
            [name]: value,
        });

        setMensaje("");
    }

    async function manejarEnvio(event) {
        event.preventDefault();

        if (enviando) return;

        setEnviando(true);
        setMensaje("");

        try {
            setErrorPublicacion(false);

            if (modoEdicion) {
                await onActualizarProyecto(proyecto.id_proyecto, formulario);
                setMensaje("El proyecto se actualizó correctamente.");
            } else {
                await onCrearProyecto(formulario);
                setMensaje(
                    `El proyecto "${formulario.titulo}" se publicó correctamente.`
                );

                setFormulario({
                    titulo: "",
                    tipo: "",
                    descripcion: "",
                    roles: "",
                    ubicacion: "",
                    estado: "Activo",
                });
            }
        } catch (error) {
            setErrorPublicacion(true);
            console.error("Error al guardar el proyecto:", error);
            setMensaje(error.message || "No fue posible guardar el proyecto.");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <>
            <Navbar
                usuario={usuario}
                onCerrarSesion={onCerrarSesion}
            />

        <section className="container py-5">
            <h1 className="mb-4">
                {modoEdicion ? "Editar proyecto" : "Publicar un proyecto"}
            </h1>

            <button
                type="button"
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate(
                    modoEdicion ? `/proyectos/${proyecto.id_proyecto}` : "/proyectos"
                )}
            >
                Volver
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
                        value={formulario.ubicacion}
                        onChange={manejarCambio}
                        required
                    />
                </div>

                {modoEdicion && (
                    <div className="mb-3">
                        <label htmlFor="estado" className="form-label">
                            Estado del proyecto
                        </label>
                        <select
                            id="estado"
                            name="estado"
                            className="form-select"
                            value={formulario.estado}
                            onChange={manejarCambio}
                            required
                        >
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                        </select>
                    </div>
                )}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={enviando}
                >
                    {enviando
                        ? "Guardando..."
                        : modoEdicion
                            ? "Guardar cambios"
                            : "Publicar proyecto"}
                </button>
            </form>

            {mensaje && (
                <div
                    className={`alert ${errorPublicacion ? "alert-danger" : "alert-success"} mt-4`}
                    role="status"
                >
                    <p className="mb-3">{mensaje}</p>

                    {!errorPublicacion && modoEdicion && (
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate(`/proyectos/${proyecto.id_proyecto}`)}
                        >
                            Volver al proyecto
                        </button>
                    )}

                    {!errorPublicacion && !modoEdicion && (
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => navigate("/proyectos")}
                        >
                            Ir a proyectos
                        </button>
                    )}
                </div>
            )}
        </section>
    </>
    );
}

export default ProjectForm;

