import { runAsync, getInfoAsync, editInfoAsync } from '/api/api.js';

class EditarPersona extends HTMLElement {
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
        let id;

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
                        
                       
                        <p>Nombre: </p>
                        <input id="nombre${item.id}" type="text" value="${item.nombre}">
                        <p>Email: </p>
                        <input id="email${item.id}" type="text" value="${item.email}">
                        <p>Id: ${item.id} </p>
                        <p>Tipo de persona:</p> 
                        <select for="${item.tipoPersonaId}" class=" tipoPersonaId" id="tipoPersona${item.id}">
                            
                            <option value="${item.tipoPersonaId}" >${item.tipoPersonaId}</option>
                        </select>

                        <button id="button${item.id}" type="button">enviar</button>
                    `;

                    container.appendChild(formItem);
                    function crearOpciones(dicc) {
                        // Selecciona el elemento select
                        let selectElement = document.getElementById(`tipoPersona${item.id}`);

                        // Crea y añade las nuevas opciones
                        for (let i = 0; i < dicc.length; i++) {
                            let option = document.createElement('option');
                            option.value = dicc[i].id;
                            option.text = dicc[i].id + ": " + dicc[i].nombre;
                            selectElement.add(option);
                        }
                    }

                    async function cargarDatos() {
                        try {
                            const data = await runAsync('http://localhost:3000/tipoPersonas');
                            crearOpciones(data);
                        } catch (error) {
                            console.log('Error al cargar datos:', error);
                        }
                    }

                    cargarDatos();

                    let boton = document.getElementById(`button${item.id}`);


                    boton.addEventListener('click', async function (e) {
                        e.preventDefault();
                        id = item.id;
                        let nombre = document.getElementById(`nombre${item.id}`);
                        let newInfo = nombre.value;
                        let paramName = "nombre";
                        let paramName2 = "email";
                        let paramName3 = "tipoPersonaId"
                        let newInfo2 = document.getElementById(`email${item.id}`).value;
                        let newInfo3 = document.getElementById(`tipoPersona${item.id}`).value;




                        await editInfoAsync(url, id, paramName, newInfo);
                        await editInfoAsync(url, id, paramName2, newInfo2);
                        await editInfoAsync(url, id, paramName3, newInfo3);
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
                    <p>Nombre: </p>
                    <input id="nombre${searchData.id}" type="text" value="${searchData.nombre}">
                    <p>Email: </p>
                    <input id="email${searchData.id}" type="text" value="${searchData.email}">
                    <p>Id: ${searchData.id} </p>
                    <p>Tipo de persona:</p> 
                    <select for="${searchData.tipoPersonaId}" class=" tipoPersonaId" id="tipoPersona${searchData.id}">
                        <option value="${searchData.tipoPersonaId}" >${searchData.tipoPersonaId}</option>
                    </select>
                    <button id="button${searchData.id}" type="button">enviar</button>
                    
                    </form>`;
                container.innerHTML += html;
                function crearOpciones(dicc) {
                    // Selecciona el elemento select
                    let selectElement = document.getElementById(`tipoPersona${searchData.id}`);

                    // Crea y añade las nuevas opciones
                    for (let i = 0; i < dicc.length; i++) {
                        let option = document.createElement('option');
                        option.value = dicc[i].id;
                        option.text = dicc[i].id + ": " + dicc[i].nombre;
                        selectElement.add(option);
                    }
                }

                async function cargarDatos() {
                    try {
                        const data = await runAsync('http://localhost:3000/tipoPersonas');
                        crearOpciones(data);
                    } catch (error) {
                        console.log('Error al cargar datos:', error);
                    }
                }

                cargarDatos();


                let boton = document.getElementById(`button${searchData.id}`);



                boton.addEventListener('click', async function (e) {
                    e.preventDefault();
                    let nombre = document.getElementById(`nombre${searchData.id}`);
                    let newInfo = nombre.value;
                    id = searchData.id;
                    let paramName = "nombre";

                    let paramName2 = "email";
                    let paramName3 = "tipoPersonaId"
                    let newInfo2 = document.getElementById(`email${searchData.id}`).value;
                    let newInfo3 = document.getElementById(`tipoPersona${searchData.id}`).value;




                    await editInfoAsync(url, id, paramName, newInfo);
                    await editInfoAsync(url, id, paramName2, newInfo2);
                    await editInfoAsync(url, id, paramName3, newInfo3);
                });
            }
        });
    }
}

customElements.define("editar-persona", EditarPersona);
