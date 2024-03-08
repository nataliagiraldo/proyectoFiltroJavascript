import { runAsync as runAsync } from '/api/api.js';

class AgregarInfo extends HTMLElement {
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
        console.log(data);
        console.log(typeof data);
        

        data.forEach(item => {
            if('nombre' in item) {
            let html = /*HTML*/`<div>
            <h2>Nombre: ${item.nombre} </h2>
            <p>Id: ${item.id} </p>
           </div> `;

            container.innerHTML += html;
            }
        });
    }
}

customElements.define("agregar-info", AgregarInfo);


