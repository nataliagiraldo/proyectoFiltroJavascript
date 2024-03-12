import { runValuesByKeyAsync, getInfoAsync, agregar, runFiltered, runAsync, editInfoAsync } from '/api/api.js';

class RetornarActivos extends HTMLElement {
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
        console.log("conected");
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

            function crearOpciones(dicc, infoItem) {
                // Selecciona el elemento select
                let selectElement = document.getElementById(`infoAsignacion${infoItem.id}`);



                // Crea y añade las nuevas opciones
                for (let i = 0; i < dicc.length; i++) {
                    let option = document.createElement('option');
                    option.value = dicc[i].id;
                    option.text = dicc[i].id + ": " + dicc[i].nombre;
                    selectElement.add(option);
                }
            }
            async function cargarDatos(infoItem) {
                try {
                    const data = await runAsync('http://localhost:3000/personas');
                    crearOpciones(data, infoItem);
                } catch (error) {
                    console.log('Error al cargar datos:', error);
                }
            }

            for (const item of items) {
                let detalles = 'http://localhost:3000/detalleMovimiento';
                let info = await runFiltered(detalles, item.id);

                const divItem = document.createElement('div');
                divItem.innerHTML = `


                <style>

                p{
                    color:white;
                    font-size: 20px;
                }

                </style>
                
                    <p>Nombre: ${item.nombre}</p>
                    <p>ID: ${item.id}</p>
                    
                `;

                container.appendChild(divItem);



                if (info.length > 0) {
                    const divItem2 = document.createElement('div');
                    divItem2.innerHTML = `

                    <style>


                    .scroll {
                        display: flex;
                        width: 40vw;
                        overflow-y: auto; 
                    }
    
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
    
                            h3, h4{
                                color:white;
                                font-size: 20px;
                            }
    
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
                            .comentario, .tipoPersonaId{
                                width: 100%;
                                height: 3vh;
                                font-size: 15px;
                                margin: 20px 0px;
                                border-radius: 5px;
                                border: none;
                            }
            
                            button{
                                padding: 8px 16px;
                                border: 1px solid #007bff;
                                border-radius: 5px;
                                background-color: #007bff;
                                color: #fff;
                            }
    
    
                            </style>
    
                        <h3>Retornar asignados<h3>
                        ${info.map(infoItem => `
                            <h4>fecha: ${infoItem.fecha}</h4>
                            <h4>activoId: ${infoItem.activoId}</h4>
                            <h4>Retornar Activo</h4>
                            <form>
                            <h5>Comentario</h5>
                            <input type="text" value="${infoItem.comentario}" id="comentario${infoItem.id}">
                            <select class=" tipoPersonaId" id="infoAsignacion${infoItem.id}">
                                <option value="${infoItem.asignacionId}" > idAsignacion ${infoItem.asignacionId}</option>
                            </select>
                            <button type="button" id="${infoItem.id}">Enviar</button>
    
                            
                            </form>
                           
                    
                        `).join('')}
                    `;
                    container.appendChild(divItem2);
                    info.forEach(infoItem => {
                        cargarDatos(infoItem);
                        let boton = document.getElementById(`${infoItem.id}`);
                        console.log("hola" + boton);
                        boton.addEventListener('click', async (event) => {
                            event.preventDefault();
                            let urlreal = 'http://localhost:3000/detalleMovimiento'
                            let id = infoItem.id;
                            console.log(id);

                            let paramName2 = "comentario";
                            let paramName3 = "asignacionId"
                            let newInfo2 = this.querySelector(`#comentario${id}`).value;
                            console.log("info" + newInfo2)
                            let newInfo3 = this.querySelector(`#infoAsignacion${id}`).value;
                            console.log("info" + newInfo3)





                            await editInfoAsync(urlreal, id, paramName2, newInfo2);
                            await editInfoAsync(urlreal, id, paramName3, newInfo3);

                        });

                    });


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
            
            <style>

            p{
                color:white;
                font-size: 20px;
            }

            </style>

                <p>Nombre: ${searchData.nombre}</p>
                <p>ID: ${searchData.id}</p>
                
                
            `;
            container.innerHTML += html;
            function crearOpciones(dicc, infoItem) {
                // Selecciona el elemento select
                let selectElement = document.getElementById(`infoAsignacion${infoItem.id}`);



                // Crea y añade las nuevas opciones
                for (let i = 0; i < dicc.length; i++) {
                    let option = document.createElement('option');
                    option.value = dicc[i].id;
                    option.text = dicc[i].id + ": " + dicc[i].nombre;
                    selectElement.add(option);
                }
            }
            async function cargarDatos(infoItem) {
                try {
                    const data = await runAsync('http://localhost:3000/personas');
                    crearOpciones(data, infoItem);
                } catch (error) {
                    console.log('Error al cargar datos:', error);
                }
            }


            let detalles = 'http://localhost:3000/detalleMovimiento';
            let info = await runFiltered(detalles, searchData.id);

            if (info.length > 0) {
                const divItem2 = document.createElement('div');
                divItem2.innerHTML = `

                <style>


                .scroll {
                    display: flex;
                    width: 40vw;
                    overflow-y: auto; 
                }

                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

                        h3, h4{
                            color:white;
                            font-size: 20px;
                        }

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
                        .comentario, .tipoPersonaId{
                            width: 100%;
                            height: 3vh;
                            font-size: 15px;
                            margin: 20px 0px;
                            border-radius: 5px;
                            border: none;
                        }
        
                        button{
                            padding: 8px 16px;
                            border: 1px solid #007bff;
                            border-radius: 5px;
                            background-color: #007bff;
                            color: #fff;
                        }


                        </style>

                    <h3>Activos asignados<h3>
                    ${info.map(infoItem => `
                    <h4>fecha: ${infoItem.fecha}</h4>
                    <h4>activoId: ${infoItem.activoId}</h4>
                    <h4>Retornar Activo</h4>
                    <form>
                    <h5>Comentario</h5>
                    <input type="text" value="${infoItem.comentario}" id="comentario${infoItem.id}">
                    <select class=" tipoPersonaId" id="infoAsignacion${infoItem.id}">
                        <option value="${infoItem.asignacionId}" > idAsignacion ${infoItem.asignacionId}</option>
                    </select>
                    <button type="button" id="${infoItem.id}">Enviar</button>

                    
                    </form>
                    `).join('')}
                `;
                container.appendChild(divItem2);
                info.forEach(infoItem => {
                    cargarDatos(infoItem);
                    let boton = document.getElementById(`${infoItem.id}`);
                    console.log("hola" + boton);
                    boton.addEventListener('click', async (event) => {
                        event.preventDefault();
                        let urlreal = 'http://localhost:3000/detalleMovimiento'
                        let id = infoItem.id;
                        console.log(id);

                        let paramName2 = "comentario";
                        let paramName3 = "asignacionId"
                        let newInfo2 = this.querySelector(`#comentario${id}`).value;
                        console.log("info" + newInfo2)
                        let newInfo3 = this.querySelector(`#infoAsignacion${id}`).value;
                        console.log("info" + newInfo3)





                        await editInfoAsync(urlreal, id, paramName2, newInfo2);
                        await editInfoAsync(urlreal, id, paramName3, newInfo3);

                    });

                });
            }
        });
    }
}

customElements.define('retornar-activos', RetornarActivos);