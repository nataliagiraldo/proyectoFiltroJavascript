import { agregar } from '/api/api.js';

class ActivosInfo extends HTMLElement {

  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `

    <style>
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        font-family: 'Poppins', sans-serif;
    }
    
    body,
    html {
        margin: 0;
        padding: 0;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .container {
        display: flex;
        gap: 5vw;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border-radius: 20px;
        width: 100%;
        height: 90vh;
    }
    
    .container h2 {
        margin-top: 5%;
        font-size: 40px;
        width: 100%;
        display: flex;
        justify-content: center;
        color: white;
    }
    
    .input-field input[type="text"],
    .input-field select {
        margin-top: 15px;
        width: 30vw;
        height: 3vh;
    }
    
    .form {
        border-radius: 20px;
        padding: 20px 40px;
        width: 32vw;
        background: darkblue;
        height: 90vh;
        display: flex;
        justify-content: center;
        flex-direction: column;
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
        font-size: clamp(0.5rem, 4vw, 1rem);
        text-transform: uppercase;
        letter-spacing: 3px;
        border-radius: 10px;
        border: solid 1px #1034aa;
        border-bottom: solid 1px #90c2ff;
        background: linear-gradient(135deg, #0034de, #006eff);
        color: #fff;
        font-weight: bolder;
        width: 40%;
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
        margin-top: 2%;
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
    
    .input-field input:focus~label,
    .input-field input:valid~label {
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
    
    .estadoId {
        margin-top: 20px;
        font-size: 1rem;
        color: rgb(0, 0, 0);
    }
    
    .estadoId {
        width: 32vw;
        height: 5vh;
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
        
        .form {
            width: 90%;
            height: 100%;
        }
    
        
        .form .btn {
            width: 50%;
            height: 5vh;
        }
        
        .estadoId {
            width: 100%;
        }
    
    }
    </style>
    
		<div class="container">
      <form class="form" action="">

      <div>
        
        <h2 class="formatoH2">Form</h2>
        <div class="input-field">
          <input
            required=""
            autocomplete="off"
            type="text"
            name="id"
            id="id"
            class="id"
          />
          <label for="id">ID</label>
        </div>

        <div class="input-field">
          <input
            required=""
            autocomplete="off"
            type="text"
            name="CodTransaccion"
            id="CodTransaccion"
            class="CodTransaccion"
          />
          <label for="CodTransaccion">CodTransaccion</label>
        </div>

        <div class="input-field">
          <input
            required=""
            autocomplete="off"
            type="text"
            name="NroFormulario"
            id="NroFormulario"
            class="NroFormulario"
          />
          <label for="NroFormulario">NroFormulario</label>
        </div>

        <div class="input-field">
          <input
            required=""
            autocomplete="off"
            type="text"
            name="marcaId"
            id="marcaId"
            class="marcaId"
          />
          <label for="marcaId">marcaId</label>
        </div>

        <div class="input-field">
          <input
            required=""
            autocomplete="off"
            type="text"
            name="categoriaId"
            id="categoriaId"
            class="categoriaId"
          />
          <label for="categoriaId">categoriaId</label>
        </div>

        <div class="input-field">
          <input
            required=""
            autocomplete="off"
            type="text"
            name="tipoId"
            id="tipoId"
            class="tipoId"
          />
          <label for="tipoId">tipoId</label>
        </div>
        
        <div action="">
          <div class="input-field">
            <input
              required=""
              autocomplete="off"
              type="text"
              name="valorUnitario"
              id="valorUnitario"
              class="valorUnitario"
            />
            <label for="valorUnitario">Valor Unitario</label>
          </div>

          <div class="input-field">
            <input
              required=""
              autocomplete="off"
              type="text"
              name="provedorId"
              id="provedorId"
              class="provedorId"
            />
            <label for="provedorId">provedorId</label>
          </div>

          <div class="input-field">
            <input
              required=""
              autocomplete="off"
              type="text"
              name="nroSerial"
              id="nroSerial"
              class="nroSerial"
            />
            <label for="nroSerial">NroSerial</label>
          </div>

          <div class="input-field">
            <input
              required=""
              autocomplete="off"
              type="text"
              name="empresaResponsableId"
              id="empresaResponsableId"
              class="empresaResponsableId"
            />
            <label for="empresaResponsableId">empresaResponsableId</label>
          </div>


          <select for="estadoId" class=" estadoId" id="estadoId">
            <option> estadoId </option>
            <option value="0">0 - No Asignado</option>
            <option value="1">1 - Asignado</option>
            <option value="2">2 - Dado de baja por daño</option>
            <option value="3">3 - En reparación y/o Garantía</option>
          </select>
    
          <div class="btn-container">
            <input class="btn" type="submit" value="Agregar" id="enviar">
          </div>
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
    const id = document.getElementById('id').value;
    const CodTransaccion = document.getElementById('CodTransaccion').value;
    const NroFormulario = document.getElementById('NroFormulario').value;
    const marcaId = document.getElementById('marcaId').value;
    const categoriaId = document.getElementById('categoriaId').value;
    const tipoId = document.getElementById('tipoId').value;
    const valorUnitario = document.getElementById('valorUnitario').value;
    const provedorId = document.getElementById('provedorId').value;
    const nroSerial = document.getElementById('nroSerial').value;
    const empresaResponsableId = document.getElementById('empresaResponsableId').value;
    const estadoId = document.getElementById('estadoId').value;

    const data = {
      "id": id,
      "CodTransaccion": CodTransaccion,
      "NroFormulario": NroFormulario,
      "marcaId": marcaId,
      "categoriaActivoId": categoriaId,
      "tipoId": tipoId,
      "valorUnitario": valorUnitario,
      "proveedorId": provedorId,
      "nroSerial": nroSerial,
      "empresaResponsableId": empresaResponsableId,
      "estadoId": estadoId
    };

    console.log(data);
    const url = `http://localhost:3000/activos`;
    agregar(data, url);
  }
}

customElements.define("activos-info", ActivosInfo);
