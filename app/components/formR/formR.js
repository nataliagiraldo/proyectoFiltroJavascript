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
        
        <style>
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
  display: flex;
  justify-content: center;
  align-items: center;
}
.container {
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    border-radius: 20px;
    width: 50vw;
    height: 70vh;
    
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
  
  .form {
    border-radius: 20px;
    padding: 0  40px;
    width: 60%;
    background: darkblue;
    height: 600px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
  }
  
  .form .btn-container {
    width: 100%;
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  
  .form .btn {
    padding: 5px 20px;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    border-radius: 10px;
    border: solid 1px #1034aa;
    border-bottom: solid 1px #90c2ff;
    background: linear-gradient(135deg, #0034de, #006eff);
    color: #fff;
    font-weight: bolder;
    width: 9vw;
    height: 5vh;
    transition: all 0.2s ease;
    box-shadow: 0px 2px 3px #000d3848, inset 0px 4px 5px #0070f0,
      inset 0px -4px 5px #002cbb;
  }
  
  .form .btn:active {
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
  
  .form .passicon {
    cursor: pointer;
    font-size: 1.3rem;
    position: absolute;
    top: 6px;
    right: 8px;
  }
  
  .form .close {
    display: none;
  }
  
  .idTipoPersona{
    font-size: 1rem;
    color: white;
  }

.seleccionDePersonas{
  width: 30vw; 
  height: 4vh; 
} 
        </style>
        <div class="container">
            <form class="form" action="">
                <h2 class="formatoH2">${(this.info).toUpperCase()}</h2>
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
            //! no previene recarga
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
