import { agregar as agregar } from '/api/api.js'

class FormComponent extends HTMLElement {
    constructor() {
        super();
        this.info = null;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.info = this.getAttribute("info");

        this.innerHTML = `
        
        <div class="container">
            <form class="form" action="">
                <h2 class="formatoH2">Form</h2>
                <div class="input-field">
                    <input required="" autocomplete="off" type="text" name="nombre" id="nombre${this.info}" />
                    <label for="username">Nombre</label>
                </div>
                
                <div class="btn-container">
                    <input class="btn" type="submit" value="Agregar" id="enviar${this.info}">
                </div>
            </form>
        </div>
        `;

        const form = this.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.getData();
        });
    }

    getData() {
        const nombre = document.getElementById(`nombre${this.info}`).value;
        
        let data = {
            "nombre": nombre,
            
        };
        console.log(data);
        let url = `http://localhost:3000/${this.info}`;
        agregar(data, url);



    }
}

customElements.define("form-r", FormComponent);

console.log("hola")