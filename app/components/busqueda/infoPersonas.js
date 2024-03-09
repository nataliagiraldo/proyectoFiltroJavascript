import { runAsync, getInfoAsync } from '/api/api.js';

class AgregarInfoPersonas extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        this.infoItems();
    }

    async infoItems() {
        
        let url = `http://localhost:3000/personas`;
        let data = await runAsync(url);
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
                if ('nombre' in item) {
                    const divItem = document.createElement('div');

                    divItem.innerHTML = /*html*/ `
                        <p>Nombre: ${item.nombre} </p>
                        <p>Id: ${item.id} </p>
                        <p>Email: ${item.email} </p>
                        <p>Tipo persona id: ${item.tipoPersonaId} </p>

                        <button id="${item.id}" type="button">mas info</button>
                    `;

                    container.appendChild(divItem);

                    let boton = document.getElementById(`${item.id}`);
                    console.log(boton);

                    boton.addEventListener('click', function () {
                        console.log('Botón clickeado');
                    });
                }
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

            if ('nombre' in searchData) {
                let html = /*html*/ `
                    <p>Nombre: ${searchData.nombre} </p>
                    <p>Id: ${searchData.id} </p>
                    <p>Email: ${searchData.email} </p>
                    <p>Tipo persona id: ${searchData.tipoPersonaId} </p>
                    
                    <button id="${searchData.id}" type="button">mas info</button>
                `;
                container.innerHTML += html;
                let boton = document.getElementById(`${searchData.id}`);
                console.log(boton);

                boton.addEventListener('click', function () {
                    console.log('Botón clickeado');
                });
            }
        });
    }
}

customElements.define("agregar-personas", AgregarInfoPersonas);
