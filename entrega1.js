const luxonDateTime = luxon.DateTime;
const fechaInit=luxonDateTime.local();
const turneroPrimero=[{nombre:"Agustin",apellido:"Fassola",servicio:"Gimnasio",dni:"41600469",fecha:fechaInit.setLocale('de').toLocaleString()}];
localStorage.setItem("turnero",JSON.stringify(turneroPrimero));

let turnoCont=0;
let listaCont=0;
let buscarCont=0;
let famososCont=0;
let reservaVacia=false;

function init()
{
    const myTitle=document.getElementById("titulo");
    myTitle.innerText='SYNERGY SPORT CLINIC ';
    myTitle.getAttribute("style","display: flex;text-align: center");
    saludoInicial();

   const nodoBtnAgregar=document.getElementById("btnAgregar");
   nodoBtnAgregar.addEventListener("click", ()=>{nuevoTurno()});

    const nodoBtnBuscar=document.getElementById("btnBuscar");
   nodoBtnBuscar.addEventListener("click", ()=>{buscarTurno()});

   const nodoBtnListar=document.getElementById("btnListar");
   nodoBtnListar.addEventListener("click", ()=>{listarTurnos()});

   const nodoBtnFamosos=document.getElementById("btnFamosos");
   nodoBtnFamosos.addEventListener("click", ()=>{ llamarPromesa()});
} 

function saludoInicial(){

    Swal.fire({
        title: `BIENVENIDO A SYNERGY!`, 
        text: 'Reserva tu turno para entrenar',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

function nuevoTurno(){
    if(turnoCont===0){
        turnoCont=1;
        const agregarT = document.querySelector("#agregar");
        let nodoTurnoNom=document.createElement("p");
        nodoTurnoNom.innerHTML=`Ingrese su nombre: <input id="nombre"></input><br></br>
                        Ingrese su apellido: <input id="apellido"></input><br></br>
                        Ingrese su DNI: <input type="number" id="dni"></input><br></br>
                        Elija un servicio: <select id="servicio">
                        <option value="Gimnasio">Gimnasio</option>
                        <option value="Nutrición">Nutrición</option>
                        <option value="Kinesiología">Kinesiología</option>
                        </select>
                        <br></br>
                        <button id="reservarHtml">RESERVAR</button>
                        <button id="cerrarReserva">CERRAR</button>`;
        console.log("nuevo turno");
        agregarT.appendChild(nodoTurnoNom);
        reservarTurno();  
    }
    else{console.log("error");}
    
}

function reservarTurno(){
    let btnReservar=document.querySelector("#reservarHtml");
    btnReservar.addEventListener("click",(event)=>{
    event.preventDefault();

    limpiarLista();
    
    let nombreInput = document.querySelector("#nombre");
    let apellidoInput = document.querySelector("#apellido");
    let dniInput = document.querySelector("#dni");
    let servicioInput = document.querySelector("#servicio");
    let nombre=nombreInput.value;
    let apellido=apellidoInput.value;
    let servicio=servicioInput.value;
    let dni=dniInput.value;
    
    verificarContenido(nombre,apellido,dni,servicio);
    limpiarReserva(nombreInput,apellidoInput,dniInput,servicioInput);
    })
    const nodoBtnCerrar=document.getElementById("cerrarReserva");
    nodoBtnCerrar.addEventListener("click", ()=>{limpiarTurno()});
}

function verificarContenido(nombre,apellido,dni,servicio){
    if(nombre===null || nombre===''){
        
        console.log("ingrese un nombre");
        reservaVacia=true;
        incompletoTostify("tu nombre");
    }else if(apellido===null || apellido===''){
        
        console.log("ingrese un apellido");
        reservaVacia=true;
        incompletoTostify("tu apellido");
    }else if(dni===null || dni===''){
        console.log("ingrese un dni");
        reservaVacia=true;
        incompletoTostify("tu DNI");
    }else if(dni>=99999999){
        console.log("dni grande")
        reservaVacia=true;
        incompletoTostify("un DNI válido");


    }else if(servicio===null || servicio===''){
        console.log("ingrese un servicio");
        reservaVacia=true;
        incompletoTostify("un servicio");

    }else{
        console.log("turno guardado");
        reservaVacia=false;
        subirTurno(nombre,apellido,dni,servicio);
        
    }
}
function subirTurno(nombre,apellido,dni,servicio)
{
    if(!reservaVacia)
    {
        const fecha= luxonDateTime.local();
        let turno= new Turno(nombre,apellido,servicio,dni,fecha.setLocale('de').toLocaleString()); 
        let turnero =JSON.parse(localStorage.getItem("turnero"));
        turnero.push(turno);
        localStorage.setItem("turnero",JSON.stringify(turnero));

        console.log(turnero);
        
        reservadoTostify();
    }else{
        console.log("incompleto");

        incompletoTostify();
    }
}
function limpiarReserva(nombre,apellido,dni,servicio){

    nombre.value="";
    apellido.value="";
    servicio.value="";
    dni.value="";
    reservaVacia=true;
}

function llamarPromesa(){
    if(famososCont===0)
    {
        famososCont=1;
        let url = 'https://fedeperin-harry-potter-api.herokuapp.com/personajes';
        fetch(url)
        .then((res)=>res.json())
        .then((data)=>{mostrarFamosos(data);
        console.log(data);
        });
    }else{console.log("error");}
}
 
function mostrarFamosos(data)
{
    const nodo = document.querySelector(".famosos");
    const subtitulo=document.createElement("h3");
    subtitulo.innerHTML="NUESTROS CLIENTES FAMOSOS";
    nodo.appendChild(subtitulo);

    data.forEach(element=>{
    const div = document.createElement("div");
    div.innerHTML=`${element.personaje}<br>`
    nodo.appendChild(div);
    });
    crearCerrarFamosos();
}

function crearCerrarFamosos()
{
    const nodo = document.querySelector(".famosos");
    const btn=document.createElement("p");
    btn.innerHTML=`<button id="cerrarFamosos">CERRAR</button>`;
    nodo.appendChild(btn);
    const nodoBtnCerrar=document.getElementById("cerrarFamosos");
    nodoBtnCerrar.addEventListener("click", ()=>{limpiarFamosos()});
}

function buscarTurno(){
    if(buscarCont===0)
    {
        buscarCont=1;
        const buscarT = document.querySelector("#buscar");
        let nodoBuscarTurno=document.createElement("p");
        nodoBuscarTurno.innerHTML=`Ingrese su DNI: <input type="number" id="buscarDni"></input><br></br>
                                <button id="buscarHtml">BUSCAR</button>
                                <button id="cerrarBuscar">CERRAR</button>`;

        console.log("buscar turno");
        buscarT.appendChild(nodoBuscarTurno);
        pedirDni();
        const nodoBtnCerrar=document.getElementById("cerrarBuscar");
        nodoBtnCerrar.addEventListener("click", ()=>{limpiarBuscar()});
    }
    else{console.log("error");}
    
    
}

function pedirDni()
{
    let buscarDni=document.querySelector("#buscarHtml");
    buscarDni.addEventListener("click", ()=>{
        console.log(buscarDni);
        buscandoDni();
    });    
}

function buscandoDni(){
    const dni = document.querySelector("#buscarDni");
    let dniIngresado=dni.value;
    if(dniIngresado===null || dniIngresado==='')
    {incompletoTostify("un DNI");}

    let turnero =JSON.parse(localStorage.getItem("turnero"));
    let siEsta=turnero.some((x)=>x.dni.indexOf(dniIngresado)!==-1);
    siEsta ? turnoEncontrado(dniIngresado) : incorrectoTostify();
    dni.value="";
}

function limpiarBuscar()
{
    console.log("limpiar turno")
    const listaLimpia = document.querySelector("#buscar");
    listaLimpia.innerHTML="";
    buscarCont=0;
}

function limpiarTurno()
{
    console.log("limpiar turno")
    const listaLimpia = document.querySelector("#agregar");
    listaLimpia.innerHTML="";
    turnoCont=0;
}

function limpiarLista(){

    const listaLimpia = document.querySelector("div");
    listaLimpia.innerHTML="";
    listaCont=0;
}

function limpiarFamosos(){

    const listaLimpia = document.querySelector(".famosos");
    listaLimpia.innerHTML="";
    famososCont=0;
}

function turnoEncontrado(dniIngresado){
    let turnero =JSON.parse(localStorage.getItem("turnero"));
    let turnoEncontrado=turnero.find((turno)=>turno.dni===dniIngresado);
    const busca = document.querySelector("#buscar");
    const nodoLiBusc=document.createElement("lu");
    nodoLiBusc.innerHTML=`TURNO ENCONTRADO: <br>
                        APELLIDO: ${turnoEncontrado.apellido}<br>
                        NOMBRE: ${turnoEncontrado.nombre}<br>
                        DNI: ${turnoEncontrado.dni}<br>
                        SERVICIO: ${turnoEncontrado.servicio} <br>
                        FECHA: ${turnoEncontrado.fecha}<br>`;
    busca.appendChild(nodoLiBusc);
    encontradoTostify();
}

function encontradoTostify(){
    Toastify({
        text: "Turno Encontrado",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {                
            background: "green",
            width: "80%",
            borderRadius: "20px",
         }
     }).showToast();
     console.log("encontrado con tostify")
}

function incorrectoTostify()
{
    Toastify({
        text: "NO SE ENCONTRÓ EL DNI",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {                
            background: "red",
            width: "80%",
            borderRadius: "20px",
         }
     }).showToast();
}

function incompletoTostify(campo)
{
    console.log(campo);
    Toastify({
        text: "Ingresa "+campo,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {                
            background: "red",
            width: "50%",
            borderRadius: "20px",
         }
     }).showToast();
}

function reservadoTostify()
{
    Toastify({
        text: "Reserva Exitosa",
        duration: 3000,
        gravity: 'top',
        position: 'right',
        style: {                
            background: "green",
            width: "80%",
            borderRadius: "20px",
         }
     }).showToast();
     console.log("reservado con tostify")
}

function listarTurnos()
  {
    if(listaCont===0)
    {
        listaCont=1;
        const lista = document.querySelector("#listar");
      //localStorage.setItem("turnero",JSON.stringify(turnero));
        let turnero =JSON.parse(localStorage.getItem("turnero"));
        turnero.forEach(element => {
          const nodoLi=document.createElement("lu");
          nodoLi.innerHTML=`APELLIDO: ${element.apellido}<br>
                          NOMBRE: ${element.nombre}<br>
                          DNI: ${element.dni}<br>
                          SERVICIO: ${element.servicio}<br>
                          FECHA: ${element.fecha} <br>
                          ------------------------<br>`;
                          lista.appendChild(nodoLi);
        });
        const nodoBtnLimpiar=document.getElementById("btnLimpiar");
        nodoBtnLimpiar.addEventListener("click", ()=>{limpiarLista()});
    }
      
  }

  class Turno{
      constructor(nombre,apellido,servicio,dni,fecha)
      {
          this.nombre=nombre;
          this.apellido=apellido;
          this.servicio=servicio;
          this.dni=dni;
          this.fecha=fecha;
      }
  }






