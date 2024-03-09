import { runFilteredAsync, getInfoAsync, deleteInfoAsync } from '/api/api.js';

class eliminarActivos extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        this.infoItems();
    }

    async infoItems() {

        let url = `http://localhost:3000/activos`;
        let data = await runFilteredAsync(url, "1");
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

            items.forEach(item => {

                const divItem = document.createElement('div');

                divItem.innerHTML = /*html*/ `
                    <p>ID: ${item.id}</p>
                    <p>ID de Estado: ${item.estadoId}</p>
                    
                    <button id="${item.id}" type="button">Eliminar</button>
                    `;

                container.appendChild(divItem);

                let boton = document.getElementById(`${item.id}`);
                console.log(boton);

                boton.addEventListener('click', function () {
                    let id = item.id
                    deleteInfoAsync(url, id)
                });

            });
        };

        renderData(data);

        document.getElementById('searchForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            let searchValue = document.getElementById('searchInput').value;

            let searchData = await getInfoAsync(url, searchValue);

            container.innerHTML = /*html*/ `
                <form id="searchForm" action="">
                    <input type="text" id="searchInput" name="searchInput" placeholder="Escribe tu búsqueda">
                    <button type="submit">Buscar</button>
                </form>
            `;


            let html = /*html*/ `
                <p>ID: ${searchData.id}</p>
                <p>ID de Estado: ${searchData.estadoId}</p>
                    
                    <button id="${searchData.id}" type="button">Eliminar</button>
                `;
            container.innerHTML += html;
            let boton = document.getElementById(`${searchData.id}`);
            console.log(boton);

            boton.addEventListener('click', function () {
                let id = searchData.id
                deleteInfoAsync(url, id)
            });

        });
    }
}

customElements.define("eliminar-activos", eliminarActivos);