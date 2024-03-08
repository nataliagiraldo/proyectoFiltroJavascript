import { getInfoAsync as getInfoAsync } from '/api/api.js'
class buscador extends HTMLElement {
    constructor() {
        super();
        this.info = null;
        
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.info = this.getAttribute("info");
        this.innerHTML = /*HTML*/ `
            <form id="searchForm" action="">
                <input type="text" id="searchInput" name="searchInput" placeholder="Escribe tu búsqueda">
                <button type="submit">Buscar</button>
            </form>
        `;
    
        document.getElementById('searchForm').addEventListener('submit', (event) => {
            event.preventDefault(); 
        
            let searchValue = document.getElementById('searchInput').value;
            let url = `http://localhost:3000/${this.info}`;
            getInfoAsync(url, searchValue);
        });
        
    }
    
    

    }


customElements.define("busca-dor", buscador);
