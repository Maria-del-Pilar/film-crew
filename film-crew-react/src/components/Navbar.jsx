function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom">
            <div className="container-fluid">

                <a className="navbar-brand" href="#">
                    <img
                        src="/images/Logowhite.png"
                        alt="FILM CREW"
                        className="logo"
                    />
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                aria-current="page"
                                href="/proyectos"
                            >
                                Proyectos
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/chats"
                            >
                                Chats
                            </a>
                        </li>

                        <li className="nav-item">
                            <a
                                className="nav-link"
                                href="/perfil"
                            >
                                Perfil
                            </a>
                        </li>

                    </ul>
                </div>

            </div>
        </nav>
    );
}

export default Navbar;