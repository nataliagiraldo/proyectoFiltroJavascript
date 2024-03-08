import { runAsync, getInfoAsync } from '/api/api.js';

class Editar extends HTMLElement {
    constructor() {
        super();
        this.info = null;
    }

    connectedCallback() {
        this.infoItems();
    }


async infoItems() {
    this.info = this.getAttribute("info");
    let url = `http://localhost:3000/${this.info}`;
    let data = await runAsync(url);
    let container = this;

    const renderData = (items) => {
        // Clear existing content
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
                const formItem = document.createElement('form');

                formItem.innerHTML = /*html*/ `
                    <h2>Nombre: </h2>
                    <input type="text" value="${item.nombre}">
                    <p>Id: ${item.id} </p>
                    <button id="${item.id}" type="button">enviar</button>
                `;

                container.appendChild(formItem);

                let boton = document.getElementById(`${item.id}`);
                console.log(boton);

                boton.addEventListener('click', function() {
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
                <form>
                    <h2>Nombre: <input type="text" value="${searchData.nombre}"> </h2>
                    <p>Id: ${searchData.id} </p>
                    <button type="button">enviar</button>
                </form>`;
            container.innerHTML += html;
        }
    });
}

}
customElements.define("edi-tar", Editar);








