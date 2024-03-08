const url = 'http://localhost:3000/activos';
const id = "1";

// Datos que deseas agregar al servidor JSON


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

const myHeaders = new Headers({
    "Content-Type": "application/json"
});

const getInfo = async (endPoint, targetId) => {
    try {
        const respuesta = await fetch(`${endPoint}`);
        // Si la respuesta es correcta
        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            // Buscar el objeto con el ID específico
            const objetoBuscado = datos.find(item => item.id === targetId);

            if (objetoBuscado) {
                // Si se encuentra el objeto, hacer algo con él
                console.log('Objeto encontrado:', objetoBuscado);
            } else {
                // Si no se encuentra el objeto
                console.log('El producto con el ID especificado no existe');
            }
        } else if (respuesta.status === 401) {
            console.log('La url no es correcta');
        } else if (respuesta.status === 404) {
            console.log('El producto que buscas no existe');
        } else {
            console.log('Se presentó un error en la petición. Consulte al Administrador');
        }
    } catch (error) {
        console.log(error);
    }
}

const getInfoAsync = async (endPoint, targetId) => {
    await getInfo(endPoint, targetId);
}


const getInfoAll = async (endPoint) => {
    try {
        const respuesta = await fetch(endPoint);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            // viewDataHtml(datos);
            console.log(datos);
            return datos;
        } else if (respuesta.status === 401) {
            console.log('La URL no es correcta');
        } else if (respuesta.status === 404) {
            console.log('El producto que buscas no existe');
        } else {
            console.log('Se presentó un error en la petición. Consulte al administrador');
        }
    } catch (error) {
        console.log('Error en la petición:', error);
    }
}


const runAsync = async (endPoint) => {
    return await getInfoAll(endPoint);
    
    
}





export {
    getInfoAsync as getInfoAsync,
    agregar as agregar,
    runAsync
}