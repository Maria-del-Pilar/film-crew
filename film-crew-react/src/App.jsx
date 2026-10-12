import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Inicio from "./Inicio";
import Proyectos from "./Proyectos";
import DetalleProyecto from "./DetalleProyecto";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/proyectos" element={<Proyectos />} />
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
