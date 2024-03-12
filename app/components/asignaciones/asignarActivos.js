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
            container.style.flexDirection = 'column';
            container.style.alignItems = 'center';
            container.style.borderRadius = '20px';
            container.style.gap = '30px'
            container.style.backgroundColor = 'darkblue';

            form.appendChild(input);
            form.appendChild(button);
            container.appendChild(form);

            const divItem2 = document.createElement('div');
                divItem2.innerHTML = `

                <style>

                .scroll {
                    display: flex;
                    width: 40vw;
                    overflow-y: auto; 
                }

                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
               

                .container {
                    gap: 30px;
                    background: none;
                    flex-direction: column;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 20px;
                    width: 40vw;
                    }

                h3{
                    color:white;
                    font-size: 20px;
                }

                #fecha, #activoId, 
                #comentario, #idResponsable{
                    width: 100%;
                    height: 3vh;
                    font-size: 15px;
                    margin: 20px 0px;
                    border-radius: 5px;
                    border: none;
                }

                #button{
                    padding: 8px 16px;
                    border: 1px solid #007bff;
                    border-radius: 5px;
                    background-color: #007bff;
                    color: #fff;
                }
                </style>

                <h3>Asignar activo<h3>

                <form action="#">

                    <label for="fecha">Fecha:</label>
                    <input type="date" id="fecha" name="fecha" value="2024-03-05" required><br>
                    
                    <label for="activoId" >Activo ID:</label>
                    <select for="tipoPersonaId" class=" tipoPersonaId" id="activoId">
                    
                        <option value="" >Activo id</option>

                     </select>

                    <br>
                    <label for="comentario">Comentario:</label>
                    
                   
                    <input type="text" id="comentario" name="comentario" value="" required><br>
                    <select class="tipoPersonaId" id="idResponsable">
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

                    <style>

                    .scroll {
                        display: flex;
                        width: 40vw;
                        overflow-y: auto; 
                    }
    
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                   
    
                    .container {
                        gap: 30px;
                        background: none;
                        flex-direction: column;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        width: 40vw;
                        }
    

                        h2{
                            font-size: 30px;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            color: white;
                        }

                    </style>

                    <h2>Nombre: ${item.nombre}</h2>
                    <h2>ID: ${item.id}</h2>
                    
                `;

                container.appendChild(divItem);

                

                if (info.length > 0) {
                    const divItem2 = document.createElement('div');
                    divItem2.innerHTML = `


                    <style>

                        h2{
                            font-size: 30px;
                            display: flex;
                            justify-content: center;
                            color: white;
                        }


                        h4{
                            font-size: 20px;
                            display: flex;
                            justify-content: center;
                            color: white;
                        }
                    </style>


                        <h2>Activos asignados<h2>
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
            `;

            let html = `

                <style>

                    h2{
                        font-size: 30px;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        color: white;
                    }

                </style>

                <h2>Nombre: ${searchData.nombre}</h2>
                <h2>ID: ${searchData.id}</h2>
            `;
            container.innerHTML += html;

            
            let detalles = 'http://localhost:3000/detalleMovimiento';
            let info = await runFiltered(detalles, searchData.id);

            if (info.length > 0) {
                const divItem2 = document.createElement('div');
                divItem2.innerHTML = `

                <style>

                h2{
                    font-size: 30px;
                    display: flex;
                    justify-content: center;
                    color: white;
                }


                h4{
                    font-size: 20px;
                    display: flex;
                    justify-content: center;
                    color: white;
                }
            </style>


                <h2>Activos asignados<h2>
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
