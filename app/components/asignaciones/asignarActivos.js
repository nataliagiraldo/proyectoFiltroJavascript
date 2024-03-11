import { runValuesByKeyAsync, getInfoAsync, agregar, runFiltered } from '/api/api.js';

// runFiltered(detalles, itemId) toma el endpoint y verifica que el id de asignacion sea igual que el item id Falta exportar hacer select 

class asignarActivos extends HTMLElement {
    constructor() {
        super();

    }
    getData = (item) => {
        const url = `http://localhost:3000/detalleMovimiento`;

        const fecha = document.getElementById(`fecha${item.id}`).value;
        const activoId = document.getElementById(`activoId${item.id}`).value;
        const comentario = document.getElementById(`comentario${item.id}`).value;
        const id = item.id;

        const data = {
            "fecha": fecha,
            "activoId": activoId,
            "comentario": comentario,
            "asignacionId": id
        };

        console.log(data);
        agregar(data, url);

    };



    connectedCallback() {
        this.infoItems();
    }

    async infoItems() {

        const url = 'http://localhost:3000/asignaciones';
        const url2 = 'http://localhost:3000/personas';
        const valuesArray = await runValuesByKeyAsync(url, "personaId");

        const data = [];
        for (const element of valuesArray) {


            data.push(await getInfoAsync(url2, element));
        }



        let container = this;

        const renderData = (items) => {

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

            items.forEach(async item => {

                const divItem = document.createElement('div');

                divItem.innerHTML = /*html*/ `
                    <p>Nombre: ${item.nombre}</p>
                    <h3>Asignar activo<h3>
                    <form action="#" >
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

                let detalles = 'http://localhost:3000/detalleMovimiento'

                let info = await runFiltered(detalles, item.id)

                info.forEach(async item => {
                    const divItem2 = document.createElement('div');

                    divItem2.innerHTML = /*html*/ `
                
                    <h3>Activos asignados<h3>
                    <h4>fecha: ${item.fecha}</h4>
                    <h4>activoId: ${item.activoId}</h4>
                    <h4>comentario: ${item.comentario}</h4>
                    
                    
                    
                    `;

                    container.appendChild(divItem2);

                });





            });

        };



        renderData(data);



        document.getElementById('searchForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            let searchValue = document.getElementById('searchInput').value;

            function buscar(asignaciones, idABuscar) {

                for (let i = 0; i < asignaciones.length; i++) {
                    if (asignaciones[i].id === idABuscar) {
                        return asignaciones[i];
                    }
                }

                return null;
            }

            let searchData = await buscar(data, searchValue)
            // getInfoAsync(url, searchValue);

            container.innerHTML = /*html*/ `
                <form id="searchForm" action="">
                    <input type="text" id="searchInput" name="searchInput" placeholder="Escribe tu búsqueda">
                    <button type="submit">Buscar</button>
                </form>
            `;


            let html = /*html*/ `
            <p>Nombre: ${searchData.nombre}</p>
            <h3>Asignar activo<h3>
            <form action="#" >
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

        });
    }
}

customElements.define("asignar-activos", asignarActivos);