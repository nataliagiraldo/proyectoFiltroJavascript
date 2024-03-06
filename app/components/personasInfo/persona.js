class personaInfo extends HTMLElement {

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
            <label for="username">Nombre</label>
          </div>
          
          <div class="input-field">
            <input
              required=""
              autocomplete="off"
              type="text"
              name="text"
              id="username"
            />
            <label for="username">Email</label>
          </div>


          <label for="name" class="idTipoPersona">idTipoPersona</label>
            <select class="seleccionDePersonas">
                <option value="hola">Natural</option>
                <option value="hola">Juridica</option>
            </select>
      
          <div class="btn-container">
            <button class="btn">Submit</button>
          </div>
    
        </form>
      </div>
		`;

    }


}
customElements.define("persona-info", personaInfo); 
