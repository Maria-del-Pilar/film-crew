import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";

function Proyectos() {
    return (
        <>
            <Navbar />

            <main className="container py-5">
                <h1 className="text-center mb-4">
                    Proyectos
                </h1>

                <div className="row g-4 justify-content-center">

                    <div className="col-md-4 d-flex justify-content-center">
                        <ProjectCard
                            imagen="/images/rollo.jpg"
                            titulo="Cortometraje"
                            descripcion="Proyecto audiovisual que busca integrantes para la producción de un cortometraje."
                        />
                    </div>

                    <div className="col-md-4 d-flex justify-content-center">
                        <ProjectCard
                            imagen="/images/rollo.jpg"
                            titulo="Documental"
                            descripcion="Proyecto documental en búsqueda de colaboradores para producción y edición."
                        />
                    </div>

                    <div className="col-md-4 d-flex justify-content-center">
                        <ProjectCard
                            imagen="/images/rollo.jpg"
                            titulo="Videoclip"
                            descripcion="Producción audiovisual para un videoclip que requiere diferentes perfiles creativos."
                        />
                    </div>

                </div>
            </main>
        </>
    );
}

export default Proyectos;