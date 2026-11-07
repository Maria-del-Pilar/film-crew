import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onIniciarSesion }) {
    const navigate = useNavigate();

    const [correo, setCorreo] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    async function manejarSubmit(e) {
        e.preventDefault();

        setError("");
        setCargando(true);

        try {
            await onIniciarSesion(correo, contraseña);
            navigate("/proyectos");

        } catch (error) {
            setError(error.message);

        } finally {
            setCargando(false);
        }
    }

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">

                    <h2 className="text-center mb-4">
                        Iniciar sesión
                    </h2>

                    <form onSubmit={manejarSubmit}>

                        <div className="mb-3">
                            <label className="form-label">
                                Correo electrónico
                            </label>

                            <input
                                type="email"
                                className="form-control"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">
                                Contraseña
                            </label>

                            <input
                                type="password"
                                className="form-control"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                                required
                            />
                        </div>

                        {error && (
                            <div className="alert alert-danger">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                            disabled={cargando}
                        >
                            {cargando ? "Ingresando..." : "Ingresar"}
                        </button>

                    </form>

                    <div className="text-center mt-3">
                        <Link to="/">
                            Volver al inicio
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
}

export default Login;