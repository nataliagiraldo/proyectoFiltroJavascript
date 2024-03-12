import { runAsync, getInfoAsync, deleteInfoAsync } from '/api/api.js';

class eliminarPersonas extends HTMLElement {
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
            input.style.marginTop = '30px';
            input.style.padding = '8px';
            input.style.marginRight = '8px';
            input.style.border = '1px solid #ccc';
            input.style.borderRadius = '5px';

            const button = document.createElement('button');
            button.type = 'submit';
            button.textContent = 'Buscar';
            button.style.padding = '8px 16px';
            button.style.border = '1px solid #007bff';
            button.style.borderRadius = '5px';
            button.style.backgroundColor = '#007bff';
            button.style.color = '#fff';

             // Estilos para el contenedor container
             container.classList.add('scroll');
             container.style.display = 'flex';
             container.style.width = '50vw';
             container.style.height = '70vh';
             container.style.padding = '20px';
             container.style.flexDirection = 'column';
             container.style.alignItems = 'center';
             container.style.borderRadius = '20px';
             container.style.gap = '30px'
             container.style.backgroundColor = 'darkblue';

            form.appendChild(input);
            form.appendChild(button);
            container.appendChild(form);

            items.forEach(item => {
                if ('nombre' in item) {
                    const divItem = document.createElement('div');

                    divItem.innerHTML = /*html*/ `

                    <style>

                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                        

                    .scroll {
                        overflow-y: auto; 
                    }


                    .aplicarDisplay{
                        display: flex;
                        gap: 30px;
                        align-items: center;
                        justify-content: center;
                    }

                    p {
                        color: white;
                        font-size: 20px;
                    }

                    .btn-container {
                        width: 25%;
                        height: 3vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                    }

                    .btn-container .btn {
                        padding: 5px 20px;
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        border-radius: 10px;
                        border: solid 1px #1034aa;
                        border-bottom: solid 1px #90c2ff;
                        background: linear-gradient(135deg, #0034de, #006eff);;
                        color: #fff;
                        font-weight: bolder;
                        width: 100%;
                        height: 2vh;
                        transition: all 0.2s ease;
                        box-shadow: 0px 2px 3px #000d3848, inset 0px 4px 5px #0070f0,
                            inset 0px -4px 5px #002cbb;
                    }
                    
                    .btn-container .btn:active {
                        box-shadow: inset 0px 4px 5px #0070f0, inset 0px -4px 5px #002cbb;
                        transform: scale(0.995);
                    }

                    @media screen and (max-width: 768px) {


                    }
                </style>

                <div class="aplicarDisplay">
                    <p>Nombre: ${item.nombre}</p>
                    <p>id: ${item.id}</p>
                    <p>Tipo persona id: ${item.tipoPersonaId} </p>
                    <div class="btn-container">
                        <button class="btn" id="${item.id}" type="button">Eliminar</button>
                    </div>
                </div>
                    `;

                    container.appendChild(divItem);

                    let boton = document.getElementById(`${item.id}`);
                    console.log(boton);

                    boton.addEventListener('click', function () {
                        let id = item.id
                        deleteInfoAsync(url, id)
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
            `;

            if ('nombre' in searchData) {
                let html = /*html*/ `

                <style>

                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                        

                    .scroll {
                        overflow-y: auto; 
                    }


                    .aplicarDisplay{
                        display: flex;
                        gap: 30px;
                        align-items: center;
                        justify-content: center;
                    }

                    p {
                        color: white;
                        font-size: 20px;
                    }

                    .btn-container {
                        width: 25%;
                        height: 3vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                    }

                    .btn-container .btn {
                        padding: 5px 20px;
                        font-size: 10px;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        border-radius: 10px;
                        border: solid 1px #1034aa;
                        border-bottom: solid 1px #90c2ff;
                        background: linear-gradient(135deg, #0034de, #006eff);;
                        color: #fff;
                        font-weight: bolder;
                        width: 100%;
                        height: 2vh;
                        transition: all 0.2s ease;
                        box-shadow: 0px 2px 3px #000d3848, inset 0px 4px 5px #0070f0,
                            inset 0px -4px 5px #002cbb;
                    }
                    
                    .btn-container .btn:active {
                        box-shadow: inset 0px 4px 5px #0070f0, inset 0px -4px 5px #002cbb;
                        transform: scale(0.995);
                    }

                    @media screen and (max-width: 768px) {


                    }
                </style>

                <div class="aplicarDisplay">
                    <p>Nombre: ${searchData.nombre}</p>
                    <p>id: ${searchData.id}</p>
                    <p>Tipo persona id: ${searchData.tipoPersonaId} </p>
                    <div class="btn-container">
                        <button class="btn" id="${searchData.id}" type="button">Eliminar</button>
                    </div>
                </div>
                `;
                container.innerHTML += html;
                let boton = document.getElementById(`${searchData.id}`);
                console.log(boton);

                boton.addEventListener('click', function () {
                    let id = searchData.id
                    deleteInfoAsync(url, id)
                });
            }
        });
    }
}

customElements.define("eliminar-personas", eliminarPersonas);
