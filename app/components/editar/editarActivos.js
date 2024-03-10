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

            const button = document.createElement('button');
            button.type = 'submit';
            button.textContent = 'Buscar';

            form.appendChild(input);
            form.appendChild(button);
            container.appendChild(form);

            items.forEach(item => {

                const formItem = document.createElement('form');

                formItem.innerHTML = /*html*/ `
                        
                       
                        <p>Id:${item.id} </p>
                        
                        <p>CodTransaccion: </p>
                        <input id="CodTransaccion${item.id}" type="text" value="${item.CodTransaccion}">
                        <p>NroFormulario: </p>
                        <input id="NroFormulario${item.id}" type="text" value="${item.NroFormulario}">
                        <p>Marca:</p> 
                        <select for="marcaId${item.id}" id="marcaId${item.id}">
                            <option value="${item.marcaId}" >${item.marcaId}</option>
                        </select>
                        <p>Categoria:</p> 
                        <select for="categoriaId${item.id}" id="categoriaId${item.id}">
                            <option value="${item.categoriaActivoId}" >${item.categoriaActivoId}</option>
                        </select>
                        <p>Tipo:</p> 
                        <select for="tipoId${item.id}" id="tipoId${item.id}">
                            <option value="${item.tipoId}" >${item.tipoId}</option>
                        </select>
                        <p>Valor unitario: </p>
                        <input id="valorUnitario${item.id}" type="text" value="${item.valorUnitario}">
                        <p>Proovedor:</p> 
                        <select for="proveedorId${item.id}" id="proveedorId${item.id}">
                            <option value="${item.proveedorId}" >${item.proveedorId}</option>
                        </select>
                        <p>Nro serial: </p>
                        <input id="NroSerial${item.id}" type="text" value="${item.nroSerial}">
                        <p>Empresa Responsable: </p>
                        <input id="empresaResponsable${item.id}" type="text" value="${item.empresaResponsableId}">
                        <p>Estado:</p> 
                        <select for="estadoId${item.id}" id="estadoId${item.id}">
                            <option value="${item.estadoId}" >${item.estadoId}</option>
                        </select>

                        <button id="button${item.id}" type="button">enviar</button>
                    `;

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
                <form id="searchForm" action="">
                    <input type="text" id="searchInput" name="searchInput" placeholder="Escribe tu búsqueda">
                    <button type="submit">Buscar</button>
                </form>
            `;


            let html = /*html*/ `
                    <form>
                        <p>Id: ${searchData.id}</p>
                        <p>CodTransaccion: </p>
                        <input id="CodTransaccion${searchData.id}" type="text" value="${searchData.CodTransaccion}">
                        <p>NroFormulario: </p>
                        <input id="NroFormulario${searchData.id}" type="text" value="${searchData.NroFormulario}">
                        <p>Marca:</p>
                        <select for="marcaId${searchData.id}" id="marcaId${searchData.id}">
                            <option value="${searchData.marcaId}">${searchData.marcaId}</option>
                        </select>
                        <p>Categoria:</p>
                        <select for="categoriaId${searchData.id}" id="categoriaId${searchData.id}">
                            <option value="${searchData.categoriaActivoId}">${searchData.categoriaActivoId}</option>
                        </select>
                        <p>Tipo:</p>
                        <select for="tipoId${searchData.id}" id="tipoId${searchData.id}">
                            <option value="${searchData.tipoId}">${searchData.tipoId}</option>
                        </select>
                        <p>Valor unitario: </p>
                        <input id="valorUnitario${searchData.id}" type="text" value="${searchData.valorUnitario}">
                        <p>Proveedor:</p>
                        <select for="proveedorId${searchData.id}" id="proveedorId${searchData.id}">
                            <option value="${searchData.proveedorId}">${searchData.proveedorId}</option>
                        </select>
                        <p>Nro serial: </p>
                        <input id="NroSerial${searchData.id}" type="text" value="${searchData.nroSerial}">
                        <p>Empresa Responsable: </p>
                        <input id="empresaResponsable${searchData.id}" type="text" value="${searchData.empresaResponsableId}">
                        <p>Estado:</p>
                        <select for="estadoId${searchData.id}" id="estadoId${searchData.id}">
                            <option value="${searchData.estadoId}">${searchData.estadoId}</option>
                        </select>

                        <button id="button${searchData.id}" type="button">enviar</button>

                    </form>`;
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
