import { runAsync, getInfoAsync } from '/api/api.js';

class AgregarInfoActivos extends HTMLElement {
    constructor() {
        super();

    }

    connectedCallback() {
        this.infoItems();
    }

    async infoItems() {

        let url = `http://localhost:3000/activos`;
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

                const divItem = document.createElement('div');

                divItem.innerHTML = /*html*/ `
                    <p>ID: ${item.id}</p>
                    <p>ID de Estado: ${item.estadoId}</p>
                    <div id = "visible${item.id}">
                        <p>Código de Transacción: ${item.CodTransaccion}</p>
                        <p>Número de Formulario: ${item.NroFormulario}</p>
                        <p>ID de Marca: ${item.marcaId}</p>
                        <p>ID de Categoría de Activo: ${item.categoriaActivoId}</p>
                        <p>ID de Tipo: ${item.tipoId}</p>
                        <p>Valor Unitario: ${item.valorUnitario}</p>
                        <p>ID de Proveedor: ${item.proveedorId}</p>
                        <p>Número de Serie: ${item.nroSerial}</p>
                        <p>ID de Empresa Responsable: ${item.empresaResponsableId}</p>
            
                    </div>
                    <button id="${item.id}" type="button">Más información</button>
                    `;

                container.appendChild(divItem);
                let esconder = document.getElementById(`visible${item.id}`);
                esconder.style.display = 'none';

                let boton = document.getElementById(`${item.id}`);
                console.log(boton);

                boton.addEventListener('click', function () {
                    if (esconder.style.display === 'none') {
                        esconder.style.display = 'block';
                    } else {
                        esconder.style.display = 'none';
                    }
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
            <div id="visible${searchData.id}">
                <p>Código de Transacción: ${searchData.CodTransaccion}</p>
                <p>Número de Formulario: ${searchData.NroFormulario}</p>
                <p>ID de Marca: ${searchData.marcaId}</p>
                <p>ID de Categoría de Activo: ${searchData.categoriaActivoId}</p>
                <p>ID de Tipo: ${searchData.tipoId}</p>
                <p>Valor Unitario: ${searchData.valorUnitario}</p>
                <p>ID de Proveedor: ${searchData.proveedorId}</p>
                <p>Número de Serie: ${searchData.nroSerial}</p>
                <p>ID de Empresa Responsable: ${searchData.empresaResponsableId}</p>
            </div>
            <button id="${searchData.id}" type="button">Más información</button>
            
                `;
            container.innerHTML += html;
            let esconder = document.getElementById(`visible${searchData.id}`);
                esconder.style.display = 'none';
            let boton = document.getElementById(`${searchData.id}`);
            console.log(boton);

            boton.addEventListener('click', function () {
                if (esconder.style.display === 'none') {
                    esconder.style.display = 'block';
                } else {
                    esconder.style.display = 'none';
                }
            });

        });
    }
}

customElements.define("agregar-activos", AgregarInfoActivos);