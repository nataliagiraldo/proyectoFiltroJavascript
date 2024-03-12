import { runAsync, getInfoAsync, editInfoAsync } from '/api/api.js';

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
                if ('nombre' in item) {
                    const formItem = document.createElement('form');

                    formItem.innerHTML = /*html*/ `
                          <style>


                        .scroll {
                            overflow-y: auto; 
                        }

                        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                        *{
                            margin: 0;
                            padding: 0;
                            font-family: 'Poppins', sans-serif;
                        }

                        body, html {
                            margin: 0;
                            padding: 0;
                            height: 100%;
                            justify-content: center;
                            align-items: center;
                        }

                        .container {
                            gap: 30px;
                            background: none;
                            flex-direction: column;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            padding: 20px;
                            width: 50vw;
                            height: 60vh;
                            
                            }

                            p {
                                color: white;
                                font-size: 20px;
                            }
            

                            .container h2{
                                font-size: 40px;
                                width: 100%;
                                display: flex;
                                justify-content: center;
                                color: white;
                        }

                            .input-field input[type="text"],
                            .input-field select {
                                width: 27vw; 
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

                            .tipoPersonaId{
                                width: 30vw;
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
                        <h2>Id: ${item.id} </h2>
                        <div class="input-field">
                            <input
                            required=""
                            autocomplete="off"
                            type="text"
                            name="nombre"
                            id="nombre${item.id}"
                            class="nombre"
                            value="${item.nombre}"
                            />
                            <label for="nombre">nombre</label>
                        </div>
   
                        <div class="btn-container">
                            <button class="btn" id="button${item.id}" type="button">enviar</button>
                        </div>
                       </form>
                   </div>`;

                    container.appendChild(formItem);

                    let boton = document.getElementById(`button${item.id}`);


                    boton.addEventListener('click', async function (e) {
                        e.preventDefault();
                        let nombre = document.getElementById(`nombre${item.id}`);
                        let newInfo = nombre.value;
                        id = item.id;
                        let paramName = "nombre";

                        console.log("event listener id", id);
                        console.log("event listener url", url);
                        console.log("event listener paramName", paramName);
                        console.log("event listener newInfo", newInfo);
                        await editInfoAsync(url, id, paramName, newInfo);
                    });
                }
            });
        };

        renderData(data);

        document.getElementById('searchForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            let searchValue = document.getElementById('searchInput').value;

            let searchData = await getInfoAsync(url, searchValue);

            container.innerHTML = /*html*/ ``;

            if ('nombre' in searchData) {
                let html = /*html*/ `

                <style>


                    .scroll {
                        overflow-y: auto; 
                    }

                    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
                    *{
                        margin: 0;
                        padding: 0;
                        font-family: 'Poppins', sans-serif;
                    }

                    body, html {
                        margin: 0;
                        padding: 0;
                        height: 100%;
                        justify-content: center;
                        align-items: center;
                    }

                    .container {
                        gap: 30px;
                        background: none;
                        flex-direction: column;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 20px;
                        width: 50vw;
                        height: 60vh;
                        
                        }
        

                        .container h2{
                            margin: 20px;
                            font-size: 40px;
                            width: 100%;
                            display: flex;
                            justify-content: center;
                            color: white;
                    }

                        .input-field input[type="text"],
                        .input-field select {
                            width: 27vw; 
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

                        .tipoPersonaId{
                            width: 30vw;
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
                        <h2>Id: ${searchData.id} </h2>
                        <div class="input-field">
                            <input
                            required=""
                            autocomplete="off"
                            type="text"
                            name="nombre"
                            id="nombre${searchData.nombre}"
                            class="nombre"
                            value="${searchData.nombre}"
                            />
                            <label for="nombre">nombre</label>
                        </div>

                        <div class="btn-container">
                            <button class="btn" id="editButton${searchData.id}" type="button">enviar</button>
                        </div>
                    </form>
                </div>`;
                
                container.innerHTML += html;

                let boton = document.getElementById(`editButton${searchData.id}`);


                boton.addEventListener('click', async function (e) {
                    e.preventDefault();
                    let nombre = document.getElementById(`nombre${searchData.nombre}`);
                    let newInfo = nombre.value;
                    id = searchData.id;
                    let paramName = "nombre";

                    console.log("event listener id", id);
                    console.log("event listener url", url);
                    console.log("event listener paramName", paramName);
                    console.log("event listener newInfo", newInfo);
                    await editInfoAsync(url, id, paramName, newInfo);
                });
            }
        });
    }
}

customElements.define("edi-tar", Editar);






