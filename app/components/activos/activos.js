class activosInfo extends HTMLElement {

    constructor() { //Es una funcion que va a ser llamada solo una vez

        super() //Agregar todas las clases del HTML
		
        this.render(); // llamar al render
    }


    render() { // Funcion que me va a mostrar

        this.innerHTML = /*HTML*/ `

		<div class="container">
        
    <form class="form" action="">

      <h2 class="formatoH2">Form</h2>
      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">id</label>
      </div>

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">CodTransaccion</label>
      </div>
      
      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">NroFormulario</label>
      </div>

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">idMarca</label>
      </div>

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">idCategoria</label>
      </div>

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">idTipo</label>
      </div>


    </form>

    <form class="form" action="">

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">Valor Unitario</label>
      </div>

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">idProveedor</label>
      </div>

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">Nro Serial</label>
      </div>

      <div class="input-field">
        <input
          required=""
          autocomplete="off"
          type="text"
          name="text"
          id="username"
        />
        <label for="username">idEmpresaResponsable</label>
      </div>

      <label for="name" class="idTipoPersona">idEstado</label>
        <select class="seleccionDePersonas">
          <label for="name" >idEstado</label>
            <option value="hola">0 - No Asignado</option>
            <option value="hola">1 - Asignado</option>
            <option value="hola">2 - Dado de baja por daño</option>
            <option value="hola">3 - En reparacion y/o Garantia</option>
        </select>
  
      <div class="btn-container">
        <button class="btn">Submit</button>
      </div>

    </form>
  </div>
		`;

    }


}

customElements.define("activos-info",  activosInfo); 
