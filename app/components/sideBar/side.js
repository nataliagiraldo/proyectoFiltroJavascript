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
              this.contenedor.innerHTML = '<form-r info="activos"></form-r >'
              break;
            case "editar":
              this.contenedor.innerHTML = '<agregar-info info="activos"></agregar-info >'
              break;
            case "eliminar":
              this.contenedor.innerHTML = ''
              break;
            case "buscar":
              this.contenedor.innerHTML = ''
              break;
          }
        }
          break;
        case "marcas": {
          switch (partes[1]) {
            case "agregar":
              this.contenedor.innerHTML = ''
              break;
            case "editar":
              this.contenedor.innerHTML = ''
              break;
            case "eliminar":
              this.contenedor.innerHTML = ''
              break;
            case "buscar":
              this.contenedor.innerHTML = ''
              break;
          }
        }
          break;
        //agregar "cases" para las otras entidades :)
      }
    }

    else{//no tiene guion en "mostrar"
      switch(partes[0]){
        case"otros":
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
      body {
        font-family: "Lato", sans-serif;
      }
      
      .sidebar {
        height: 100%;
        width: 0;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        background-color: #111;
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
        color: #f1f1f1;
      }
      
      .sidebar .closebtn {
        position: absolute;
        top: 0;
        right: 25px;
        font-size: 36px;
        margin-left: 50px;
      }
      
      .openbtn {
        font-size: 20px;
        cursor: pointer;
        background-color: #111;
        color: white;
        padding: 10px 15px;
        border: none;
      }
      
      .openbtn:hover {
        background-color: #444;
      }
      
      #main {
        transition: margin-left .5s;
        padding: 16px;
      }
        .sidenav a, .dropdown-btn {
        padding: 6px 8px 6px 16px;
        text-decoration: none;
        font-size: 20px;
        color: #818181;
        display: block;
        border: none;
        background: none;
        width: 100%;
        text-align: left;
        cursor: pointer;
        outline: none;
      }
      
      /* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
      @media screen and (max-height: 450px) {
        .sidebar {padding-top: 15px;}
        .sidebar a {font-size: 18px;}
      }
      </style>
      </head>
      <body>
      
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
          <a href="#" class="btnMostrar" >Agregar</a>
          <a href="#" class="btnMostrar" >Editar</a>
          <a href="#" class="btnMostrar" >Eliminar</a>
          <a href="#" class="btnMostrar" >Buscar</a>
        </div>
        <button class="dropdown-btn">Estado 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" >Agregar</a>
          <a href="#" class="btnMostrar" >Editar</a>
          <a href="#" class="btnMostrar" >Eliminar</a>
          <a href="#" class="btnMostrar" >Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo persona 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" >Agregar</a>
          <a href="#" class="btnMostrar" >Editar</a>
          <a href="#" class="btnMostrar" >Eliminar</a>
          <a href="#" class="btnMostrar" >Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo MovimentoAct 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" >Agregar</a>
          <a href="#" class="btnMostrar" >Editar</a>
          <a href="#" class="btnMostrar" >Eliminar</a>
          <a href="#" class="btnMostrar" >Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo activo 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#" class="btnMostrar" >Agregar</a>
          <a href="#" class="btnMostrar" >Editar</a>
          <a href="#" class="btnMostrar" >Eliminar</a>
          <a href="#" class="btnMostrar" >Buscar</a>
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
        <button class="openbtn" onclick="openNav()">☰ Open Sidebar</button>
        <div id="contenedor">

        <h2>Collapsed Sidebar</h2>
        <p>Click on the hamburger menu/bar icon to open the sidebar, and push this content to the right.</p>
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
