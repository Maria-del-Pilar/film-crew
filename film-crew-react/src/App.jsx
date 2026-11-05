import { useState, useEffect } from "react";
import { obtenerProyectos, crearProyecto } from "./services/api";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Inicio from "./Inicio";
import Proyectos from "./Proyectos";
import DetalleProyecto from "./DetalleProyecto";
import ProjectForm from "./components/ProjectForm";

function App() {
    const [proyectos, setProyectos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

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
    const respuesta = await crearProyecto(nuevoProyecto);

    const proyectoGuardado = {
        ...nuevoProyecto,
        id: respuesta.id_proyecto,
        id_proyecto: respuesta.id_proyecto,
        imagen: "/images/rollo.jpg",
    };

    setProyectos((proyectosActuales) => [
        ...proyectosActuales,
        proyectoGuardado,
    ]);

    return proyectoGuardado;
}

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />

                <Route
                    path="/proyectos"
                    element={<Proyectos proyectos={proyectos} />}
                />

                <Route
                    path="/proyectos/nuevo"
                    element={
                        <ProjectForm
                            onCrearProyecto={agregarProyecto}
                        />
                    }
                />

                <Route
                    path="/proyectos/:id"
                    element={<DetalleProyecto />}
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

