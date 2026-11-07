import { useState, useEffect } from "react";
import { 
        obtenerProyectos, 
        crearProyecto, 
        actualizarProyecto,
        eliminarProyecto,
        iniciarSesion 
} from "./services/api";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    useParams
} from "react-router-dom";

import Inicio from "./Inicio";
import Proyectos from "./Proyectos";
import DetalleProyecto from "./DetalleProyecto";
import ProjectForm from "./components/ProjectForm";
import Login from "./Login";

function EditarProyecto({ 
    proyectos,
    onActualizarProyecto,
    usuario,
    onCerrarSesion
}) {

    const { id } = useParams();

    const proyecto = proyectos.find(
        (p) => String(p.id_proyecto) === id
    );

    if (!proyecto) {
        return <p className="text-center mt-5">Proyecto no encontrado.</p>;
    }

    return (
        <ProjectForm
            proyecto={proyecto}
            onActualizarProyecto={onActualizarProyecto}
            usuario={usuario}
            onCerrarSesion={onCerrarSesion}
        />
    );
}

function App() {
    const [proyectos, setProyectos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

        const [token, setToken] = useState(
        localStorage.getItem("token") || ""
    );

    const [usuario, setUsuario] = useState(() => {
        const usuarioGuardado = localStorage.getItem("usuario");

        return usuarioGuardado
            ? JSON.parse(usuarioGuardado)
            : null;
    });

async function manejarInicioSesion(correo, contraseña) {
    const datos = await iniciarSesion(correo, contraseña);

    localStorage.setItem("token", datos.token);
    localStorage.setItem("usuario", JSON.stringify(datos.usuario));

    setToken(datos.token);
    setUsuario(datos.usuario);
}

function cerrarSesion() {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");

    setToken("");
    setUsuario(null);
}

    useEffect(() => {
        async function cargarProyectos() {
            try {
                const datos = await obtenerProyectos();
                setProyectos(
                    datos.map((proyecto) => ({
                        ...proyecto,
                        id: proyecto.id_proyecto,
                        imagen: "/images/rollo.jpg",
                    }))
                );

            } catch (error) {
                console.error("Error:", error);
                setError("No fue posible cargar los proyectos.");
            } finally {
                setCargando(false);
            }
        }

    cargarProyectos();
}, []);

if (cargando) {
    return <p className="text-center mt-5">Cargando proyectos...</p>;
}

if (error) {
    return <p className="text-center mt-5">{error}</p>;
}

async function agregarProyecto(nuevoProyecto) {
    const respuesta = await crearProyecto(nuevoProyecto, token);

    const proyectoGuardado = {
        ...nuevoProyecto,
        id: respuesta.id_proyecto,
        id_proyecto: respuesta.id_proyecto,
        id_usuario: usuario.id_usuario,
        imagen: "/images/rollo.jpg",
    };

    setProyectos((proyectosActuales) => [
        ...proyectosActuales,
        proyectoGuardado,
    ]);

    return proyectoGuardado;
}

async function editarProyecto(id, datosActualizados) {
    await actualizarProyecto(id, datosActualizados, token);

    setProyectos((proyectosActuales) =>
        proyectosActuales.map((proyecto) =>
            proyecto.id_proyecto === id
                ? { ...proyecto, ...datosActualizados }
                : proyecto
        )
    );
}

async function borrarProyecto(id) {
    await eliminarProyecto(id, token);

    setProyectos((proyectosActuales) =>
        proyectosActuales.filter(
            (proyecto) => proyecto.id_proyecto !== id
        )
    );
}

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <Inicio
                            usuario={usuario}
                            onCerrarSesion={cerrarSesion}
                        />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login onIniciarSesion={manejarInicioSesion} />
                    }
                />

                <Route
                    path="/proyectos"
                    element={
                        <Proyectos
                            proyectos={proyectos}
                            onEliminarProyecto={borrarProyecto}
                            usuario={usuario}
                            onCerrarSesion={cerrarSesion}
                        />
                    }
                />

                <Route
                    path="/proyectos/nuevo"
                    element={
                        usuario ? (
                            <ProjectForm
                                onCrearProyecto={agregarProyecto}
                                usuario={usuario}
                                onCerrarSesion={cerrarSesion}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/proyectos/:id/editar"
                    element={
                        usuario ? (
                            <EditarProyecto
                                proyectos={proyectos}
                                onActualizarProyecto={editarProyecto}
                                usuario={usuario}
                                onCerrarSesion={cerrarSesion}
                            />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/proyectos/:id"
                    element={
                        <DetalleProyecto
                            usuario={usuario}
                            onCerrarSesion={cerrarSesion}
                        />
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

