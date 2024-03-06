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
           
            <form>
                <h3>Nombre</h3>
                <input type="text" id="nombre${this.info}" name="nombre">
                <h3>ID</h3>
                <input type="text" id="id${this.info}" name="id">
                <input type="submit" value="Agregar" id="enviar${this.info}">
            </form>
        `;

        const form = this.querySelector('form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.getData();
        });
    }

    getData() {
        const nombre = document.getElementById(`nombre${this.info}`).value;
        const id = document.getElementById(`id${this.info}`).value;
        let data = {
            "nombre": nombre,
            "id": id
        };
        console.log(data);
        return data


    }
}

customElements.define("form-r", FormComponent);

