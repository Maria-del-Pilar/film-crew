
import Navbar from "./components/Navbar";
import ProjectCard from "./components/ProjectCard";

function Proyectos() {
    // Información de ejemplo para mostrar las tarjetas.
    const proyectos = [
        {
            id: "1",
            imagen: "/images/rollo.jpg",
            titulo: "Cortometraje",
            descripcion:
                "Proyecto audiovisual que busca integrantes para la producción de un cortometraje.",
        },
        {
            id: "2",
            imagen: "/images/rollo.jpg",
            titulo: "Documental",
            descripcion:
                "Proyecto documental en búsqueda de colaboradores para producción y edición.",
        },
        {
            id: "3",
            imagen: "/images/rollo.jpg",
            titulo: "Videoclip",
            descripcion:
                "Producción audiovisual para un videoclip que requiere diferentes perfiles creativos.",
        },
    ];

    return (
        <>
            <Navbar />

            <main className="container py-5">
                <h1 className="text-center mb-4">
                    Proyectos
                </h1>

                <div className="row g-4 justify-content-center">
                    {proyectos.map((proyecto) => (
                        <div
                            className="col-md-4 d-flex justify-content-center"
                            key={proyecto.id}
                        >
                            <ProjectCard {...proyecto} />
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
}

export default Proyectos;
