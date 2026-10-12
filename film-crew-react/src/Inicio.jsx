
import { Link } from "react-router-dom";
import Navbar from "./components/Navbar";

function Inicio() {
    return (
        <>
            <Navbar />

            <main className="container py-5 text-center">
                <h1>FILM CREW CONNECT</h1>

                <p className="lead mt-3">
                    Conecta con personas, crea proyectos y haz realidad
                    tus ideas audiovisuales.
                </p>

                <Link
                    to="/proyectos"
                    className="btn btn-primary mt-3"
                >
                    Explorar proyectos
                </Link>
            </main>
        </>
    );
}

export default Inicio;
