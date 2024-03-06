class sideBar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
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
          <a href="#">Agregar</a>
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
          <a href="#">Buscar</a>
        </div>
        <button class="dropdown-btn">Marcas 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#">Agregar</a>
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
          <a href="#">Buscar</a>
        </div>
        <button class="dropdown-btn">Persona 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#">Agregar</a>
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
          <a href="#">Buscar</a>
        </div>
        <button class="dropdown-btn">Estado 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#">Agregar</a>
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
          <a href="#">Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo persona 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#">Agregar</a>
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
          <a href="#">Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo MovimentoAct 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#">Agregar</a>
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
          <a href="#">Buscar</a>
        </div>
        <button class="dropdown-btn">Tipo activo 
          <i class="fa fa-caret-down"></i>
        </button>
        <div class="dropdown-container">
          <a href="#">Agregar</a>
          <a href="#">Editar</a>
          <a href="#">Eliminar</a>
          <a href="#">Buscar</a>
        </div>
       
      </div>
      
      <div id="main">
        <button class="openbtn" onclick="openNav()">☰ Open Sidebar</button>  
        <h2>Collapsed Sidebar</h2>
        <p>Click on the hamburger menu/bar icon to open the sidebar, and push this content to the right.</p>
      </div>
      
      
      `;
        const myScript = document.createElement('script');
        myScript.src = 'sideApp.js';
        document.head.appendChild(myScript);
    }

}


customElements.define('side-bar', sideBar);
