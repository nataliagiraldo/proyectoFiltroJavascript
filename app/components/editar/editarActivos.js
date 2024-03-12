import { runAsync, getInfoAsync, editInfoAsync } from '/api/api.js';

class EditarActivos extends HTMLElement {
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

            items.forEach(item => {

                const formItem = document.createElement('form');

                formItem.innerHTML = /*html*/ `
                        
                <style>


                .scroll {
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

                    .container h2{
                        font-size: 40px;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        color: white;
                }

                    .input-field input[type="text"]{
                        width: 15vw; 
                        height: 3vh; 
                    }
                    
                    .container .heading {
                        font-size: 1.3rem;
                        margin-bottom: 20px;
                        font-weight: bolder;
                    }
                    
                
                    .container .btn-container {
                        width: 100%;
                        height: 10vh;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 20px;
                    }
                    
                    .container .btn {
                        padding: 5px 20px;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 3px;
                        border-radius: 10px;
                        border: solid 1px #1034aa;
                        border-bottom: solid 1px #90c2ff;
                        background: linear-gradient(135deg, #0034de, #006eff);;
                        color: #fff;
                        font-weight: bolder;
                        width: 50%;
                        height: 5vh;
                        transition: all 0.2s ease;
                        box-shadow: 0px 2px 3px #000d3848, inset 0px 4px 5px #0070f0,
                            inset 0px -4px 5px #002cbb;
                    }
                    
                    .container .btn:active {
                        box-shadow: inset 0px 4px 5px #0070f0, inset 0px -4px 5px #002cbb;
                        transform: scale(0.995);
                    }
                    
                    .input-field {
                        display: flex;
                        justify-content: center;
                        position: relative;
                    }
                    
                    .input-field label {
                        position: absolute;
                        color: #000000;
                        pointer-events: none;
                        background-color: transparent;
                        left: 15px;
                        transform: translateY(0.6rem);
                        transition: all 0.3s ease;
                    }
                    
                    .input-field input {
                        padding: 10px 15px;
                        font-size: 1rem;
                        border-radius: 8px;
                        border: solid 1px #8d8d8d;
                        letter-spacing: 1px;
                        width: 100%;
                    }
                    
                    .input-field input:focus,
                    .input-field input:valid {
                        outline: none;
                        border: solid 1px #0034de;
                    }
                    
                    .input-field input:focus ~ label,
                    .input-field input:valid ~ label {
                        transform: translateY(-51%) translateX(-10px) scale(0.8);
                        background-color: #fff;
                        padding: 0px 5px;
                        color: #0034de;
                        font-weight: bold;
                        letter-spacing: 1px;
                        border: none;
                        border-radius: 100px;
                    }
                    
                    .container .passicon {
                        cursor: pointer;
                        font-size: 1.3rem;
                        position: absolute;
                        top: 6px;
                        right: 8px;
                    }
                    
                    .container .close {
                        display: none;
                    }
                    
                    .tipoPersonaId{
                        font-size: 1rem;
                    }

                    select{
                        border-radius: 10px;
                        width: 17vw;
                        height: 4vh; 
                    }

                    @media(max-width: 760px){

                        .container {
                            width: 90%;
                            height: 90vh;
                        }

                        .input-field input[type="text"],
                        .input-field select {
                            width: 90%;
                        }
                        
                        .container {
                            width: 90%;
                            height: 100%;
                        }

                        
                        .container .btn {
                            width: 50%;
                            height: 5vh;
                        }
                    }
                </style>

                <div class="container">
                    <form class="form">
                        <h2 class="formatoH2">Editar</h2>

                        <h2>Id:${item.id} </h2>

                        <div class="input-field">
                            <input
                            required=""
                            autocomplete="off"
                            type="text"
                            name="nombre"
                            id="CodTransaccion${item.id}"
                            class="nombre"
                            value="${item.CodTransaccion}"
                            />
                            <label for="CodTransaccion">CodTransaccion</label>
                        </div>
                        
                        <div class="input-field">
                            <input
                            required=""
                            autocomplete="off"
                            type="text"
                            name="email"
                            id="NroFormulario${item.id}"
                            class="email"
                            value="${item.NroFormulario}"
                            />
                            <label for="NroFormulario">NroFormulario</label>
                        </div>
        

                        <select for="marcaId${item.id}"  class="tipoPersonaId" id="marcaId${item.id}">
                            <option value="${item.marcaId}" >${item.marcaId}</option>
                        </select>

                        <select for="categoriaId${item.id}"  class="tipoPersonaId" id="categoriaId${item.id}">
                            <option value="${item.categoriaActivoId}" >${item.categoriaActivoId}</option>
                        </select>

                        <select for="tipoId${item.id}"  class="tipoPersonaId" id="tipoId${item.id}">
                            <option value="${item.tipoId}" >${item.tipoId}</option>
                        </select>

                        <div class="input-field">
                            <input
                            required=""
                            autocomplete="off"
                            type="text"
                            name="valorUnitario"
                            id="valorUnitario${item.id}"
                            class="valorUnitario"
                            value="${item.valorUnitario}"
                            />
                            <label for="valorUnitario">valorUnitario</label>
                        </div>

                        <select for="proveedorId${item.id}"  class="tipoPersonaId" id="proveedorId${item.id}">
                            <option value="${item.proveedorId}" >${item.proveedorId}</option>
                        </select>
        
                        <div class="input-field">
                            <input
                            required=""
                            autocomplete="off"
                            type="text"
                            name="email"
                            id="NroSerial${item.id}"
                            class="email"
                            value="${item.nroSerial}"
                            />
                            <label for="NroSerial">NroSerial</label>
                        </div>

                        <div class="input-field">
                            <input
                            required=""
                            autocomplete="off"
                            type="text"
                            name="empresaResponsable"
                            id="empresaResponsable${item.id}"
                            class="empresaResponsable"
                            value="${item.empresaResponsable}"
                            />
                            <label for="empresaResponsable">empresaResponsable</label>
                        </div>

                        <select for="estadoId${item.id}"  class="tipoPersonaId" id="estadoId${item.id}">
                            <option value="${item.estadoId}" >${item.estadoId}</option>
                        </select>
                    
                        <div class="btn-container">
                            <button class="btn" id="button${item.id}" type="button">enviar</button>
                        </div>
                    </form>
                </div>`;

                container.appendChild(formItem);
                let elementMarca = `marcaId${item.id}`;
                let endpointMarca = "marcas";
                let elementCategoria = `categoriaId${item.id}`;
                let endpointCategoria = "categoriaActivos";
                let elementTipo = `tipoId${item.id}`;
                let endpointTipo = "tipoActivos";
                let elementProvedor = `proveedorId${item.id}`;
                let endpointProvedor = "proveedores";
                let elementEstado = `estadoId${item.id}`;
                let endpointEstado = "estados";



                function crearOpciones(dicc, element) {
                    // Selecciona el elemento select
                    let selectElement = document.getElementById(element);

                    // Crea y añade las nuevas opciones
                    for (let i = 0; i < dicc.length; i++) {
                        let option = document.createElement('option');
                        option.value = dicc[i].id;
                        option.text = dicc[i].id + ": " + dicc[i].nombre;
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

                cargarDatos(elementMarca, endpointMarca);
                cargarDatos(elementCategoria, endpointCategoria);
                cargarDatos(elementTipo, endpointTipo);
                cargarDatos(elementProvedor, endpointProvedor);
                cargarDatos(elementEstado, endpointEstado);



                let boton = document.getElementById(`button${item.id}`);


                boton.addEventListener('click', async function (e) {
                    e.preventDefault();
                    let id = item.id;


                    let CodTransaccion = document.getElementById(`CodTransaccion${item.id}`);
                    let newInfo1 = CodTransaccion.value;
                    await editInfoAsync(url, id, "CodTransaccion", newInfo1);


                    let NroFormulario = document.getElementById(`NroFormulario${item.id}`);
                    let newInfo2 = NroFormulario.value;
                    await editInfoAsync(url, id, "NroFormulario", newInfo2);


                    let marca = document.getElementById(`marcaId${item.id}`);
                    let newInfo3 = marca.value;
                    await editInfoAsync(url, id, "marcaId", newInfo3);


                    let categoria = document.getElementById(`categoriaId${item.id}`);
                    let newInfo4 = categoria.value;
                    await editInfoAsync(url, id, "categoriaActivoId", newInfo4);


                    let tipo = document.getElementById(`tipoId${item.id}`);
                    let newInfo5 = tipo.value;
                    await editInfoAsync(url, id, "tipoId", newInfo5);


                    let valorUnitario = document.getElementById(`valorUnitario${item.id}`);
                    let newInfo6 = valorUnitario.value;
                    await editInfoAsync(url, id, "valorUnitario", newInfo6);


                    let proveedor = document.getElementById(`proveedorId${item.id}`);
                    let newInfo7 = proveedor.value;
                    await editInfoAsync(url, id, "proveedorId", newInfo7);


                    let NroSerial = document.getElementById(`NroSerial${item.id}`);
                    let newInfo8 = NroSerial.value;
                    await editInfoAsync(url, id, "nroSerial", newInfo8);


                    let empresaResponsable = document.getElementById(`empresaResponsable${item.id}`);
                    let newInfo9 = empresaResponsable.value;
                    await editInfoAsync(url, id, "empresaResponsableId", newInfo9);


                    let estado = document.getElementById(`estadoId${item.id}`);
                    let newInfo10 = estado.value;
                    await editInfoAsync(url, id, "estadoId", newInfo10);




                });
            }
            );
        };

        renderData(data);

        document.getElementById('searchForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            let searchValue = document.getElementById('searchInput').value;

            let searchData = await getInfoAsync(url, searchValue);

            container.innerHTML = /*html*/ `
            `;


            let html = /*html*/ `
            <style>


            .scroll {
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

                .form{
                    flex-direction: column;
                display: flex;
                justify-content: center;
                align-items: center;
                gap:30px
                }

                .container h2{
                    font-size: 40px;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    color: white;
            }

                .input-field input[type="text"]{
                    width: 15vw; 
                    height: 3vh; 
                }
                
                .container .heading {
                    font-size: 1.3rem;
                    margin-bottom: 20px;
                    font-weight: bolder;
                }
                
            
                .container .btn-container {
                    width: 100%;
                    height: 10vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 20px;
                }
                
                .container .btn {
                    padding: 5px 20px;
                    font-size: 1rem;
                    text-transform: uppercase;
                    letter-spacing: 3px;
                    border-radius: 10px;
                    border: solid 1px #1034aa;
                    border-bottom: solid 1px #90c2ff;
                    background: linear-gradient(135deg, #0034de, #006eff);;
                    color: #fff;
                    font-weight: bolder;
                    width: 50%;
                    height: 5vh;
                    transition: all 0.2s ease;
                    box-shadow: 0px 2px 3px #000d3848, inset 0px 4px 5px #0070f0,
                        inset 0px -4px 5px #002cbb;
                }
                
                .container .btn:active {
                    box-shadow: inset 0px 4px 5px #0070f0, inset 0px -4px 5px #002cbb;
                    transform: scale(0.995);
                }
                
                .input-field {
                    display: flex;
                    justify-content: center;
                    position: relative;
                }
                
                .input-field label {
                    position: absolute;
                    color: #000000;
                    pointer-events: none;
                    background-color: transparent;
                    left: 15px;
                    transform: translateY(0.6rem);
                    transition: all 0.3s ease;
                }
                
                .input-field input {
                    padding: 10px 15px;
                    font-size: 1rem;
                    border-radius: 8px;
                    border: solid 1px #8d8d8d;
                    letter-spacing: 1px;
                    width: 100%;
                }
                
                .input-field input:focus,
                .input-field input:valid {
                    outline: none;
                    border: solid 1px #0034de;
                }
                
                .input-field input:focus ~ label,
                .input-field input:valid ~ label {
                    transform: translateY(-51%) translateX(-10px) scale(0.8);
                    background-color: #fff;
                    padding: 0px 5px;
                    color: #0034de;
                    font-weight: bold;
                    letter-spacing: 1px;
                    border: none;
                    border-radius: 100px;
                }
                
                .container .passicon {
                    cursor: pointer;
                    font-size: 1.3rem;
                    position: absolute;
                    top: 6px;
                    right: 8px;
                }
                
                .container .close {
                    display: none;
                }
                
                .tipoPersonaId{
                    font-size: 1rem;
                }

                select{
                    border-radius: 10px;
                    width: 17vw;
                    height: 4vh; 
                }

                @media(max-width: 760px){

                    .container {
                        width: 90%;
                        height: 90vh;
                    }

                    .input-field input[type="text"],
                    .input-field select {
                        width: 90%;
                    }
                    
                    .container {
                        width: 90%;
                        height: 100%;
                    }

                    
                    .container .btn {
                        width: 50%;
                        height: 5vh;
                    }
                }
            </style>

            <div class="container">
                <form class="form">
                    <h2 class="formatoH2">Editar</h2>

                    <h2>Id:${searchData.id} </h2>

                    <div class="input-field">
                        <input
                        required=""
                        autocomplete="off"
                        type="text"
                        name="nombre"
                        id="CodTransaccion${searchData.id}"
                        class="nombre"
                        value="${searchData.CodTransaccion}"
                        />
                        <label for="CodTransaccion">CodTransaccion</label>
                    </div>
                    
                    <div class="input-field">
                        <input
                        required=""
                        autocomplete="off"
                        type="text"
                        name="email"
                        id="NroFormulario${searchData.id}"
                        class="email"
                        value="${searchData.NroFormulario}"
                        />
                        <label for="NroFormulario">NroFormulario</label>
                    </div>
    

                    <select for="marcaId${searchData.id}"  class="tipoPersonaId" id="marcaId${searchData.id}">
                        <option value="${searchData.marcaId}" >${searchData.marcaId}</option>
                    </select>

                    <select for="categoriaId${searchData.id}"  class="tipoPersonaId" id="categoriaId${searchData.id}">
                        <option value="${searchData.categoriaActivoId}" >${searchData.categoriaActivoId}</option>
                    </select>

                    <select for="tipoId${searchData.id}"  class="tipoPersonaId" id="tipoId${searchData.id}">
                        <option value="${searchData.tipoId}" >${searchData.tipoId}</option>
                    </select>

                    <div class="input-field">
                        <input
                        required=""
                        autocomplete="off"
                        type="text"
                        name="valorUnitario"
                        id="valorUnitario${searchData.id}"
                        class="valorUnitario"
                        value="${searchData.valorUnitario}"
                        />
                        <label for="valorUnitario">valorUnitario</label>
                    </div>

                    <select for="proveedorId${searchData.id}"  class="tipoPersonaId" id="proveedorId${searchData.id}">
                        <option value="${searchData.proveedorId}" >${searchData.proveedorId}</option>
                    </select>
    
                    <div class="input-field">
                        <input
                        required=""
                        autocomplete="off"
                        type="text"
                        name="email"
                        id="NroSerial${searchData.id}"
                        class="email"
                        value="${searchData.nroSerial}"
                        />
                        <label for="NroSerial">NroSerial</label>
                    </div>

                    <div class="input-field">
                        <input
                        required=""
                        autocomplete="off"
                        type="text"
                        name="empresaResponsable"
                        id="empresaResponsable${searchData.id}"
                        class="empresaResponsable"
                        value="${searchData.empresaResponsable}"
                        />
                        <label for="empresaResponsable">empresaResponsable</label>
                    </div>

                    <select for="estadoId${searchData.id}"  class="tipoPersonaId" id="estadoId${searchData.id}">
                        <option value="${searchData.estadoId}" >${searchData.estadoId}</option>
                    </select>
                
                    <div class="btn-container">
                        <button class="btn" id="button${searchData.id}" type="button">enviar</button>
                    </div>
                </form>
            </div>`;
            container.innerHTML += html;
            let elementMarca = `marcaId${searchData.id}`;
            let endpointMarca = "marcas";
            let elementCategoria = `categoriaId${searchData.id}`;
            let endpointCategoria = "categoriaActivos";
            let elementTipo = `tipoId${searchData.id}`;
            let endpointTipo = "tipoActivos";
            let elementProveedor = `proveedorId${searchData.id}`;
            let endpointProveedor = "proveedores";
            let elementEstado = `estadoId${searchData.id}`;
            let endpointEstado = "estados";

            function crearOpciones(dicc, element) {
                // Selecciona el elemento select
                let selectElement = document.getElementById(element);

                // Crea y añade las nuevas opciones
                for (let i = 0; i < dicc.length; i++) {
                    let option = document.createElement('option');
                    option.value = dicc[i].id;
                    option.text = dicc[i].id + ": " + dicc[i].nombre;
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

            cargarDatos(elementMarca, endpointMarca);
            cargarDatos(elementCategoria, endpointCategoria);
            cargarDatos(elementTipo, endpointTipo);
            cargarDatos(elementProveedor, endpointProveedor);
            cargarDatos(elementEstado, endpointEstado);


            let boton = document.getElementById(`button${searchData.id}`);



            boton.addEventListener('click', async function (e) {
                e.preventDefault();
                let id = searchData.id;

                let CodTransaccion = document.getElementById(`CodTransaccion${searchData.id}`);
                let newInfo1 = CodTransaccion.value;
                await editInfoAsync(url, id, "CodTransaccion", newInfo1);

                let NroFormulario = document.getElementById(`NroFormulario${searchData.id}`);
                let newInfo2 = NroFormulario.value;
                await editInfoAsync(url, id, "NroFormulario", newInfo2);

                let marca = document.getElementById(`marcaId${searchData.id}`);
                let newInfo3 = marca.value;
                await editInfoAsync(url, id, "marcaId", newInfo3);

                let categoria = document.getElementById(`categoriaId${searchData.id}`);
                let newInfo4 = categoria.value;
                await editInfoAsync(url, id, "categoriaActivoId", newInfo4);

                let tipo = document.getElementById(`tipoId${searchData.id}`);
                let newInfo5 = tipo.value;
                await editInfoAsync(url, id, "tipoId", newInfo5);

                let valorUnitario = document.getElementById(`valorUnitario${searchData.id}`);
                let newInfo6 = valorUnitario.value;
                await editInfoAsync(url, id, "valorUnitario", newInfo6);

                let proveedor = document.getElementById(`proveedorId${searchData.id}`);
                let newInfo7 = proveedor.value;
                await editInfoAsync(url, id, "proveedorId", newInfo7);

                let NroSerial = document.getElementById(`NroSerial${searchData.id}`);
                let newInfo8 = NroSerial.value;
                await editInfoAsync(url, id, "nroSerial", newInfo8);

                let empresaResponsable = document.getElementById(`empresaResponsable${searchData.id}`);
                let newInfo9 = empresaResponsable.value;
                await editInfoAsync(url, id, "empresaResponsableId", newInfo9);

                let estado = document.getElementById(`estadoId${searchData.id}`);
                let newInfo10 = estado.value;
                await editInfoAsync(url, id, "estadoId", newInfo10);
            });

        }
        );
    }
}

customElements.define("editar-activos", EditarActivos);
