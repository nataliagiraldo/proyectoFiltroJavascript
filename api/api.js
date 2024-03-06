const url = 'http://localhost:3000/activos';

// Datos que deseas agregar al servidor JSON
let nuevosDatos = {
    titulo: "Nueva tarea",
    fechaDeInicio: "lo que sea",
    fechaDeFin: "2024-03-10",
    descripcion: "Descripción de la nueva tarea"
};

function agregar(info, endPoint) {
    let opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(info)
    };

    fetch(endPoint, opciones)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ocurrió un error al agregar datos.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos agregados correctamente:', data);
            // Realizar acciones adicionales si es necesario
        })
        .catch(error => {
            console.error('Error al agregar datos:', error);
        });
}

agregar(nuevosDatos, url);


export {
    agregar as agregar
}