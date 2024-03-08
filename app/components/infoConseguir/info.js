import { runAsync, getInfoAsync } from '/api/api.js';

class AgregarInfo extends HTMLElement {
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
            container.innerHTML = /*html*/ `
                <form id="searchForm" action="">
                    <input type="text" id="searchInput" name="searchInput" placeholder="Escribe tu búsqueda">
                    <button type="submit">Buscar</button>
                </form>
            `;
            items.forEach(item => {
                if ('nombre' in item) {
                    let html = /*html*/ `<div>
                        <h2>Nombre: ${item.nombre} </h2>
                        <p>Id: ${item.id} </p>
                    </div> `;
                    container.innerHTML += html;
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
                let html = /*html*/ `<div>
                    <h2>Nombre: ${searchData.nombre} </h2>
                    <p>Id: ${searchData.id} </p>
                </div> `;
                container.innerHTML += html;
            }
        });
    }
}

customElements.define("agregar-info", AgregarInfo);
