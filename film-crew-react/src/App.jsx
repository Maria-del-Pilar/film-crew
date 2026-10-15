import { useState } from "react";
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
    const [proyectos, setProyectos] = useState([
        {
            id: "1",
            imagen: "/images/rollo.jpg",
            titulo: "Cortometraje",
            descripcion:
                "Proyecto audiovisual que busca integrantes para la producción de un cortometraje.",
            tipo: "Cortometraje",
            roles: "Dirección, fotografía y edición",
            ubicacion: "Duitama, Colombia",
        },
        {
            id: "2",
            imagen: "/images/rollo.jpg",
            titulo: "Documental",
            descripcion:
                "Proyecto documental en búsqueda de colaboradores para producción y edición.",
            tipo: "Documental",
            roles: "Producción y edición",
            ubicacion: "Colombia",
        },
        {
            id: "3",
            imagen: "/images/rollo.jpg",
            titulo: "Videoclip",
            descripcion:
                "Producción audiovisual para un videoclip que requiere diferentes perfiles creativos.",
            tipo: "Videoclip",
            roles: "Cámara y dirección de arte",
            ubicacion: "Colombia",
        },
    ]);

    function agregarProyecto(nuevoProyecto) {
        setProyectos((proyectosActuales) => [
            ...proyectosActuales,
            {
                ...nuevoProyecto,
                id: String(Date.now()),
                imagen: "/images/rollo.jpg",
            },
        ]);
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

