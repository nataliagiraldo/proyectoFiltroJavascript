
const id = "1";
const newId = "natalia"
const paramName = "nombre"

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
                return objetoBuscado
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

    const objetoBuscado = await getInfo(endPoint, targetId);
    return objetoBuscado;
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


const editInfo = async (endPoint, targetId, paramName, paramValue) => {
    try {
        // Obtener la información actual
        const respuesta = await fetch(`${endPoint}`);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            // Buscar el objeto con el ID específico
            const objetoBuscadoIndex = datos.findIndex(item => item.id === targetId);

            if (objetoBuscadoIndex !== -1) {
                // Si se encuentra el objeto, actualizar el parámetro específico
                datos[objetoBuscadoIndex][paramName] = paramValue;

                // Realizar la solicitud de actualización
                const updateResponse = await fetch(`${endPoint}/${targetId}`, {
                    method: 'PUT',
                    headers: myHeaders,
                    body: JSON.stringify(datos[objetoBuscadoIndex])
                });

                if (updateResponse.status === 200) {
                    console.log('Objeto actualizado con éxito:', datos[objetoBuscadoIndex]);
                    return datos[objetoBuscadoIndex];
                } else {
                    console.log('Error al intentar actualizar el objeto. Consulte al Administrador');
                }
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

const editInfoAsync = async (endPoint, targetId, paramName, paramValue) => {
    const objetoActualizado = await editInfo(endPoint, targetId, paramName, paramValue);
    return objetoActualizado;
}

// editInfoAsync(url, id, paramName, newId)

const deleteInfo = async (endPoint, targetId) => {
    try {
        // Obtener la información actual
        const response = await fetch(`${endPoint}`);

        // Verificar si la respuesta es exitosa (código 200)
        if (response.status === 200) {
            const data = await response.json();

            // Buscar el índice del objeto con el ID específico
            const indexToDelete = data.findIndex(item => item.id === targetId);

            // Verificar si se encontró el objeto con el ID específico
            if (indexToDelete !== -1) {
                // Eliminar el objeto del array
                data.splice(indexToDelete, 1);

                // Realizar la solicitud de eliminación al servidor
                const deleteResponse = await fetch(`${endPoint}/${targetId}`, {
                    method: 'DELETE',
                });

                // Verificar si la eliminación fue exitosa (código 204)
                if (deleteResponse.status === 204) {
                    console.log('Elemento eliminado con éxito');
                } else {
                    console.log('Error al eliminar el elemento');
                }
            } else {
                console.log('Elemento no encontrado');
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

const deleteInfoAsync = async (endPoint, targetId) => {
    await deleteInfo(endPoint, targetId);
};

// deleteInfoAsync(url, id)

const getInfoFilteredByStateId = async (endPoint, estadoId) => {
    try {
        const respuesta = await fetch(endPoint);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            // Filtrar los datos por estadoId
            const datosFiltrados = datos.filter(item => item.estadoId === estadoId);

            // viewDataHtml(datosFiltrados); // Puedes hacer lo que necesites con los datos filtrados
            console.log(datosFiltrados);

            return datosFiltrados;
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


const runFilteredAsync = async (endPoint, estadoId) => {
    return await getInfoFilteredByStateId(endPoint, estadoId);
}

// runFilteredAsync(url, "1")

const getValuesByKey = async (endPoint, key) => {
    try {
        const response = await fetch(endPoint);

        if (response.status === 200) {
            const data = await response.json();

            // Obtener todos los valores de la llave específica
            const values = data.map(item => item[key]);

            // viewDataHtml(values); // Puedes hacer lo que necesites con los valores obtenidos
            console.log(values);

            return values;
        } else if (response.status === 401) {
            console.log('La URL no es correcta');
        } else if (response.status === 404) {
            console.log('El producto que buscas no existe');
        } else {
            console.log('Se presentó un error en la petición. Consulte al administrador');
        }
    } catch (error) {
        console.log('Error en la petición:', error);
    }
}

const runValuesByKeyAsync = async (endPoint, key) => {
    return await getValuesByKey(endPoint, key);
}




// const url = 'http://localhost:3000/asignaciones';
// const url2 = 'http://localhost:3000/personas';
// const valuesArray = await runValuesByKeyAsync(url, "personaId");

// const data = [];
// for (const element of valuesArray) {


//     data.push(await getInfoAsync(url2, element));
// }


// getInfoAll('http://localhost:3000/detalleMovimiento'), aginacionId  === item.id  print si es solo 1 de resto for each


const getInfoFilteredByState = async (endPoint, estadoId) => {
    try {
        const respuesta = await fetch(endPoint);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();

            // Filtrar los datos por estadoId
            const datosFiltrados = datos.filter(item => item.asignacionId === estadoId);

            // viewDataHtml(datosFiltrados); // Puedes hacer lo que necesites con los datos filtrados
            console.log(datosFiltrados);

            return datosFiltrados;
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


const runFiltered = async (endPoint, estadoId) => {
    return await getInfoFilteredByState(endPoint, estadoId);
}

// runFiltered(detalles, itemId) toma el endpoint y verifica que el id de asignacion sea igual que el item id Falta exportar hacer select
// let link = 'http://localhost:3000/detalleMovimiento'








export {
    getInfoAsync as getInfoAsync,
    agregar as agregar,
    runAsync,
    editInfoAsync,
    deleteInfoAsync,
    runFilteredAsync,
    runValuesByKeyAsync, 
    runFiltered
    
}