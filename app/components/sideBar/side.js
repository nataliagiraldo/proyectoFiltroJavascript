class sideBar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  mostrar(strIn) {
    //pre: asume que strIn es un string de forma "parte1-parte2"
    //donde parte1 se refiere a la entidad y parte2 a pantalla de la accion correspondiente
    //activos-crear
    //ajustes
    let partes = strIn.split("-")
    console.log("adentro: " + partes)
    if (partes.length > 1) { //si tiene un guion
      switch (partes[0]) {
        case "activos": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = '<activos-info info="activos"></activos-info>'
              break;
            case "editar":
              this.contenedor.innerHTML = '<edi-tar info="activos"></edi-tar>'
              break;
            case "eliminar":
              this.contenedor.innerHTML = '<eliminar-info info="activos"></eliminar-info>'
              break;
            case "buscar":
              this.contenedor.innerHTML = '<busca-dor info="activos"></busca-dor>'
              break;
          }
        }
          break;

        case "Marcas": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = '<form-r info="marcas"></form-r>'
              break;
            case "editar":
              this.contenedor.innerHTML = '<edi-tar info="marcas"></edi-tar>'
              break;
            case "eliminar":
              this.contenedor.innerHTML = '<eliminar-info info="marcas"></eliminar-info>'
              break;
            case "buscar":
              this.contenedor.innerHTML = '<busca-dor info="marcas"></busca-dor>'
              break;
          }
        }
          break;

        case "Persona": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = '<persona-info info="personas"></persona-info>'
              break;
            case "editar":
              this.contenedor.innerHTML = '<edi-tar info="personas"></edi-tar>'
              break;
            case "eliminar":
              this.contenedor.innerHTML = '<eliminar-info info="personas"></eliminar-info>'
              break;
            case "buscar":
              this.contenedor.innerHTML = '<busca-dor info="personas"></busca-dor>'
              break;
          }
        }
          break;

        case "Estado": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = '<form-r info="estados"></form-r>';
              break;
            case "editar":
              this.contenedor.innerHTML = '<edi-tar info="estados"></edi-tar>'
              break;
            case "eliminar":
              this.contenedor.innerHTML = '<eliminar-info info="estados"></eliminar-info>'
              break;
            case "buscar":
              this.contenedor.innerHTML = '<busca-dor info="estados"></busca-dor>'
              break;
          }
          break;
        }

        case "tipoPersonas": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = '<form-r info="tipoPersonas"></form-r>';
              break;
            case "editar":
              this.contenedor.innerHTML = '<edi-tar info="tipoPersonas"></edi-tar>'
              break;
            case "eliminar":
              this.contenedor.innerHTML = '<eliminar-info info="tipoPersonas"></eliminar-info>'
              break;
            case "buscar":
              this.contenedor.innerHTML = '<busca-dor info="tipoPersonas"></busca-dor>'
              break;
          }
          break;
        }

        case "tipoMovActivos": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = '<form-r info="tipoMovActivos"></form-r>';
              break;
            case "editar":
              this.contenedor.innerHTML = '<edi-tar info="tipoMovActivos"></edi-tar>'
              break;
            case "eliminar":
              this.contenedor.innerHTML = '<eliminar-info info="tipoMovActivos"></eliminar-info>'
              break;
            case "buscar":
              this.contenedor.innerHTML = '<busca-dor info="tipoMovActivos"></busca-dor>'
              break;
          }
          break;
        }

        case "tipoActivos": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = '<form-r info="tipoActivos"></form-r>';
              break;
            case "editar":
              this.contenedor.innerHTML = '<edi-tar info="tipoActivos"></edi-tar>'
              break;
            case "eliminar":
              this.contenedor.innerHTML = '<eliminar-info info="tipoActivos"></eliminar-info>'
              break;
            case "buscar":
              this.contenedor.innerHTML = '<busca-dor info="tipoMovActivos"></busca-dor>'
              break;
          }
          break;
        }
      }
    }

    else {//no tiene guion en "mostrar"
      switch (partes[0]) {
        case "otros":
          this.contenedor.innerHTML = 'otros'

          break;
        case "ajustes":
          this.contenedor.innerHTML = 'ajustes'
          break;
      }
    }
  }

  async render() {
    this.innerHTML = `
      <link rel="stylesheet" href="formR.css" type="module">
      <style>

      body,html{
        margin:0;
        height: 100%;
        font-family: "Lato", sans-serif;
      }
      
      .sidebar {
        height: 100%;
        width: 0;
        position: fixed;
        left: 0;
        background-color:#00008b;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
      }
      
      .sidebar a {
        padding: 8px 8px 8px 32px;
        text-decoration: none;
        color: #818181;
        display: block;
        transition: 0.3s;
      }
      
      .sidebar a:hover {
        color: white;
      }
      
      .sidebar .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
      }
      
      .openbtn {
        top:0;
        font-size: 20px;
        cursor: pointer;
        background-color: #00008b;
        color: white;
        padding: 10px 15px;
        border: none;
      }
      
      .openbtn:hover {
        background-color: blue;
        transition: 0.3s;
      }
      
      #main {
        margin:0;
        transition: margin-left .5s;
        padding: 0 16px;
        height:92%;
        color:  #00008b;
        font-size: 20px;
      }

      #contenedor{
        width: 100%;
        height:90%;
        align-items: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .sidenav a, .dropdown-btn {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 20px;
        color: white;
        display: block;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        outline: none;
      }

      .navbar {
        margin: 0 10px; 
        height; 10px;
        display: flex;
        align-items: center;
    }

      .navbar img {
        width: 81px; 
        height: auto; 
        margin-right: 10px;
    }

 
    #contenedor img {
      width: 40%; 
      height: auto; 
      margin-right: 10px; /* 
    }
      
      /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
      @media screen and (max-height: 450px) {
        .sidebar {padding-top: 15px;}
        .sidebar a {font-size: 18px;}
      }
      </style>
      </head>
      <body>

      <div class="navbar">
        <img src="storage/img/logo.png" alt="Logo">
        <h2>CampusLands</h2>
      </div>
      
      <div id="mySidebar" class="sidebar">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
       <button class="dropdown-btn">Activos 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" onclick="mostrar(this.getAttribute("mostrar"))" class="btnMostrar" mostrar="activos-agregar">Agregar</a>
          <a href="#"  class="btnMostrar" mostrar="activos-editar">Editar</a>
          <a href="#"  class="btnMostrar" mostrar="activos-eliminar">Eliminar</a>
          <a href="#"  class="btnMostrar" mostrar="activos-buscar">Buscar</a>
        </div>
        <button class="dropdown-btn">Marcas 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#"  class="btnMostrar" mostrar="Marcas-agregar">Agregar</a>
          <a href="#"  class="btnMostrar" mostrar="Marcas-editar">Editar</a>
          <a href="#"  class="btnMostrar" mostrar="Marcas-eliminar">Eliminar</a>
          <a href="#"  class="btnMostrar" mostrar="Marcas-buscar">Buscar</a>
        </div>
        <button class="dropdown-btn">Persona 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" mostrar="Persona-agregar" >Agregar</a>
          <a href="#" class="btnMostrar" mostrar="Persona-editar">Editar</a>
          <a href="#" class="btnMostrar" mostrar="Persona-eliminar">Eliminar</a>
          <a href="#" class="btnMostrar" mostrar="Persona-buscar">Buscar</a>
        </div>
        <button class="dropdown-btn">Estado 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" mostrar="Estado-agregar">Agregar</a>
          <a href="#" class="btnMostrar" mostrar="Estado-editar">Editar</a>
          <a href="#" class="btnMostrar" mostrar="Estado-eliminar">Eliminar</a>
          <a href="#" class="btnMostrar" mostrar="Estado-buscar">Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo persona 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" mostrar="tipoPersonas-agregar">Agregar</a>
          <a href="#" class="btnMostrar" mostrar="tipoPersonas-editar">Editar</a>
          <a href="#" class="btnMostrar" mostrar="tipoPersonas-eliminar">Eliminar</a>
          <a href="#" class="btnMostrar" mostrar="tipoPersonas-buscar">Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo MovimentoAct 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" mostrar="tipoMovActivos-agregar">Agregar</a>
          <a href="#" class="btnMostrar" mostrar="tipoMovActivos-editar">Editar</a>
          <a href="#" class="btnMostrar" mostrar="tipoMovActivos-eliminar">Eliminar</a>
          <a href="#" class="btnMostrar" mostrar="tipoMovActivos-buscar">Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo activo 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" mostrar="tipoActivos-agregar">Agregar</a>
          <a href="#" class="btnMostrar" mostrar="tipoActivos-editar">Editar</a>
          <a href="#" class="btnMostrar" mostrar="tipoActivos-eliminar">Eliminar</a>
          <a href="#" class="btnMostrar" mostrar="tipoActivos-buscar">Buscar</a>
        </div>
       
        <button class="dropdown-btn">Otros
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#"  class="btnMostrar" mostrar="otros">Agregar</a>
          <a href="#"  class="btnMostrar" mostrar="ajustes">Editar</a>
        </div>
     
      </div>
      
      <div id="main">
        <button class="openbtn" onclick="openNav()">☰</button>
        <div id="contenedor">
          <h2>SISTEMA DE GESTION DE ACTIVOS</h2>
          <img src="storage/img/astronauta.png" alt="Logo">
        </div> 
      </div>
      
      
      `;
    const myScript = document.createElement('script');
    myScript.src = '/app/components/sideBar/sideApp.js';
    myScript.defer = true
    document.head.appendChild(myScript);
    let contenedor = await document.getElementById("contenedor")
    this.contenedor = contenedor

    let botones = await document.getElementsByClassName("btnMostrar")
    console.log("tipo" + botones)
    if (botones) {
      Array.from(botones).forEach(element => {
        element.addEventListener("click", (e) => {
          e.preventDefault()
          this.mostrar(element.getAttribute("mostrar"))
        })
      });
    }
    else console.log("no hay botones");

  }
}


customElements.define('side-bar', sideBar);
