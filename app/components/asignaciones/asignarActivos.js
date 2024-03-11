import { runValuesByKeyAsync, getInfoAsync, agregar, runFiltered } from '/api/api.js';

class AsignarActivos extends HTMLElement {
    constructor() {
        super();
    }

    getData = (item) => {
        const url = 'http://localhost:3000/detalleMovimiento';

        const fecha = document.getElementById(`fecha${item.id}`).value;
        const activoId = document.getElementById(`activoId${item.id}`).value;
        const comentario = document.getElementById(`comentario${item.id}`).value;
        const id = item.id;

        const data = {
            fecha: fecha,
            activoId: activoId,
            comentario: comentario,
            asignacionId: id
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

            for (const item of items) {
                let detalles = 'http://localhost:3000/detalleMovimiento';
                let info = await runFiltered(detalles, item.id);

                const divItem = document.createElement('div');
                divItem.innerHTML = `
                    <p>Nombre: ${item.nombre}</p>
                    <h3>Asignar activo<h3>
                    <form action="#">
                        <label for="fecha">Fecha:</label>
                        <input type="date" id="fecha${item.id}" name="fecha" value="2024-03-05" required><br>
                        <label for="activoId">Activo ID:</label>
                        <input type="text" id="activoId${item.id}" name="activoId" value="Select" required><br>
                        <label for="comentario">Comentario:</label>
                        <input type="text" id="comentario${item.id}" name="comentario" value="" required><br>
                        <button id="${item.id}" type="button">Enviar</button>
                    </form>
                `;

                container.appendChild(divItem);

                let boton = document.getElementById(`${item.id}`);
                console.log(boton);
                boton.addEventListener('click', (event) => {
                    event.preventDefault();
                    this.getData(item);
                });

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
                <h3>Asignar activo<h3>
                <form action="#">
                    <label for="fecha">Fecha:</label>
                    <input type="date" id="fecha${searchData.id}" name="fecha" value="2024-03-05" required><br>
                    <label for="activoId">Activo ID:</label>
                    <input type="text" id="activoId${searchData.id}" name="activoId" value="Select" required><br>
                    <label for="comentario">Comentario:</label>
                    <input type="text" id="comentario${searchData.id}" name="comentario" value="" required><br>
                    <button id="${searchData.id}" type="button">Enviar</button>
                </form>
            `;
            container.innerHTML += html;

            let boton = document.getElementById(`${searchData.id}`);
            console.log(boton);

            boton.addEventListener('click', (event) => {
                event.preventDefault();
                this.getData(searchData);
            });
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
