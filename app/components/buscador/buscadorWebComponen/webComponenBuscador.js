console.log("hola")

class masInfo extends HTMLElement {

    constructor() { //Es una funcion que va a ser llamada solo una vez
        super() //Agregar todas las clases del HTML
    }

    connectedCallback() {
        this.render();
    }

    render() { // Funcion que me va a mostrar

        this.innerHTML = /*HTML*/ `

        <style>
            .barraBuscador{
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
            }

            .preVisualizacionDelBuscador{
                display: flex;
                justify-content: space-evenly;
                background: red;
            }

            .descripcion {
                display: none;
                background: darkblue;
                width: 40%;
                height: 30vw;
                padding: 20px;
                border: 2px solid #333;
                border-radius: 10px;
                margin: 20px auto;
            }

            .descripcion ul {
                gap: 30px;
                list-style: none;
                padding: 0;
            }
            
            .descripcion li {
                font-size: 26px;
                margin-bottom: 5px;
                color: white;
            }
            

            

        </style>

        <div class="barraBuscador">
        <div class="preVisualizacionDelBuscador">
            <h2>id</h2>
            <h2>Nombre</h2>
            <h2>Estado</h2>
            <input class="button" type="submit">
        </div>
            <div class="descripcion">
                <ul>
                    <li>id</li>
                    <li>CodTransaccion</li>
                    <li>NroFormulario</li>
                    <li>marcaId</li>
                    <li>categoriaId</li>
                    <li>tipoId</li>
                    <li>valorUnitario</li>
                    <li>provedorId</li>
                    <li>nroSerial</li>
                    <li>empresaResponsableId</li>
                    <li>estadoId</li>
                </ul>
            </div>
        </div>

		`;

        const button = document.querySelector('.button');
        const descripcion = document.querySelector('.descripcion');
        let descripcionVisible = false;

        button.addEventListener('click', function () {

            if (!descripcionVisible) {
                descripcion.style.display = 'flex';
                descripcionVisible = true;
            } else {
                descripcion.style.display = 'none';
                descripcionVisible = false;
            }
        });
    }

}
customElements.define("mas-info", masInfo);



