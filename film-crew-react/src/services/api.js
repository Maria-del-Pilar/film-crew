const API_URL = "http://localhost:3000/api";

export async function obtenerProyectos() {
    const respuesta = await fetch(`${API_URL}/proyectos`);

    if (!respuesta.ok) {
        throw new Error("No fue posible obtener los proyectos");
    }

    return await respuesta.json();
}

export async function crearProyecto(proyecto) {
    const respuesta = await fetch(`${API_URL}/proyectos`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...proyecto,
            id_usuario: 1,
        }),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No fue posible crear el proyecto");
    }

    return datos;
}

export async function obtenerProyectoPorId(id) {
    const respuesta = await fetch(`${API_URL}/proyectos/${id}`);

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No fue posible obtener el proyecto");
    }

    return datos;
}

export async function actualizarProyecto(id, proyecto) {
    const respuesta = await fetch(`${API_URL}/proyectos/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proyecto),
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No fue posible actualizar el proyecto");
    }

    return datos;
}

export async function eliminarProyecto(id) {
    const respuesta = await fetch(`${API_URL}/proyectos/${id}`, {
        method: "DELETE",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
        throw new Error(datos.mensaje || "No fue posible eliminar el proyecto");
    }

    return datos;
}