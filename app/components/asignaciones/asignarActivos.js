import { runValuesByKeyAsync, getInfoAsync, agregar, runFiltered, runAsync } from '/api/api.js';

class AsignarActivos extends HTMLElement {
    constructor() {
        super();
    }

    getData = () => {
        const url = 'http://localhost:3000/detalleMovimiento';

        const fecha = document.getElementById(`fecha`).value;
        const activoId = document.getElementById(`activoId`).value;
        const comentario = document.getElementById(`comentario`).value;
        const idResponsable = document.getElementById(`idResponsable`).value;
        
        

        const data = {
            fecha: fecha,
            activoId: activoId,
            comentario: comentario,
            asignacionId: idResponsable
        };

        console.log(data);
        agregar(data, url);
    };

    connectedCallback() {
        this.infoItems();
    }

    async infoItems() {
        const urlAsignaciones = 'http://localhost:3000/asignaciones';
        const urlPersonas = 'http://localhost:3000/personas';
        const valuesArray = await runValuesByKeyAsync(urlAsignaciones, 'personaId');

        const data = [];
        for (const element of valuesArray) {
            data.push(await getInfoAsync(urlPersonas, element));
        }

        let container = this;

        const renderData = async (items) => {
            container.innerHTML = '';

            const form = document.createElement('form');
            form.id = 'searchForm';
            form.action = '';

            const input = document.createElement('input');
            input.type = 'text';
            input.id = 'searchInput';
            input.name = 'searchInput';
            input.placeholder = 'Escribe tu búsqueda';

            const button = document.createElement('button');
            button.type = 'submit';
            button.textContent = 'Buscar';

            form.appendChild(input);
            form.appendChild(button);
            container.appendChild(form);

            const divItem2 = document.createElement('div');
                divItem2.innerHTML = `
                <h3>Asignar activo<h3>
                <form action="#">
                    <label for="fecha">Fecha:</label>
                    <input type="date" id="fecha" name="fecha" value="2024-03-05" required><br>
                    <label for="activoId">Activo ID:</label>
                    <select for="tipoPersonaId" class=" tipoPersonaId" id="activoId">
                    <option value="" >Activo id</option>

   
                     </select>
                    <br>
                    <label for="comentario">Comentario:</label>
                    
                    <input type="text" id="comentario" name="comentario" value="" required><br>
                    <select class=" tipoPersonaId" id="idResponsable">
                        <option value="" > idResponsable </option>
                    </select>
                    <button id="button" type="button">Enviar</button>
                </form>
                    
                `; 
                container.appendChild(divItem2);

                let elementActivo = `activoId`;
                let endpointActivo = "activos";
                let elementResponsable = `idResponsable`;
                let endpointResponsable = "personas";



                function crearOpciones(dicc, element) {
                    // Selecciona el elemento select
                    let selectElement = document.getElementById(element);

                    // Crea y añade las nuevas opciones
                    for (let i = 0; i < dicc.length; i++) {
                        let option = document.createElement('option');
                        option.value = dicc[i].id;
                        option.text = dicc[i].id ;
                        selectElement.add(option);
                    }
                }

                async function cargarDatos(element, endpoint) {
                    try {
                        const data = await runAsync('http://localhost:3000/' + endpoint);
                        crearOpciones(data, element);
                    } catch (error) {
                        console.log('Error al cargar datos:', error);
                    }
                }

                cargarDatos(elementActivo, endpointActivo);
                cargarDatos(elementResponsable, endpointResponsable);

                let boton = document.getElementById(`button`);
                console.log(boton);
                boton.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.getData();
                });


            

            for (const item of items) {
                let detalles = 'http://localhost:3000/detalleMovimiento';
                let info = await runFiltered(detalles, item.id);

                const divItem = document.createElement('div');
                divItem.innerHTML = `
                    <p>Nombre: ${item.nombre}</p>
                    <p>ID: ${item.id}</p>
                    
                `;

                container.appendChild(divItem);

                

                if (info.length > 0) {
                    const divItem2 = document.createElement('div');
                    divItem2.innerHTML = `
                        <h3>Activos asignados<h3>
                        ${info.map(infoItem => `
                            <h4>fecha: ${infoItem.fecha}</h4>
                            <h4>activoId: ${infoItem.activoId}</h4>
                            <h4>comentario: ${infoItem.comentario}</h4>
                        `).join('')}
                    `;
                    container.appendChild(divItem2);
                }
            }
        };

        renderData(data);

        document.getElementById('searchForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            let searchValue = document.getElementById('searchInput').value;
            let searchData = await data.find(item => item.id === searchValue);

            container.innerHTML = `
                <form id="searchForm" action="">
                    <input type="text" id="searchInput" name="searchInput" placeholder="Escribe tu búsqueda">
                    <button type="submit">Buscar</button>
                </form>
            `;

            let html = `
                <p>Nombre: ${searchData.nombre}</p>
                <p>ID: ${searchData.id}</p>
                
            `;
            container.innerHTML += html;

            
            let detalles = 'http://localhost:3000/detalleMovimiento';
            let info = await runFiltered(detalles, searchData.id);

            if (info.length > 0) {
                const divItem2 = document.createElement('div');
                divItem2.innerHTML = `
                    <h3>Activos asignados<h3>
                    ${info.map(infoItem => `
                        <h4>fecha: ${infoItem.fecha}</h4>
                        <h4>activoId: ${infoItem.activoId}</h4>
                        <h4>comentario: ${infoItem.comentario}</h4>
                    `).join('')}
                `;
                container.appendChild(divItem2);
            }
        });
    }
}

customElements.define('asignar-activos', AsignarActivos);
