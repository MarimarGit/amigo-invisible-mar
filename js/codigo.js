if(document.addEventListener) {
   document.addEventListener("DOMContentLoaded", inicio);
} else {
   alert("Por favor, actualice el navegador");
}

function inicio() {
   //aquí se empezaría a ejecutar nuestro código al cargar el DOM
}



function obtenerNombres() {
   //limpiamos todo lo que haya en el contenedor de anteriores sorteos
   inicializarContenedorResultados();

   var nombres = document.querySelector("#nombres").value;
   var arrayNombres = nombres.split(",");
   

   if(arrayNombres.length<2) {
      mostrarMensaje("danger", "Debe introducir al menos 2 nombres");
   } else {
      //recorremos el array para quitarle los espacios blancos si los hay
      for (var i=0; i<= arrayNombres.length-1; i++) {
         arrayNombres[i] = arrayNombres[i].trim();
      }

      //hago una copia del array de nombres para no tocar el original al desordenarlo
      var arrayNombresCopia = arrayNombres.slice();
      
      //desordeno el array de forma aleatoria
      var arrayNombresDesorden = desordenar(arrayNombresCopia);

      //hago una copia del array de nombres desordenados
      var arrayRegaladores = arrayNombresDesorden.slice();

      //descuadro los arrays
      //añado el primer elemento al final
      arrayRegaladores.push(arrayRegaladores[0]);
      //borro el primer elemento
      arrayRegaladores.shift();



      document.querySelector("#nombres").value = "";

      //mostramos en una columna el array de nombres y en otra los regaladores
      mostrarResultadoSorteo(arrayNombres, arrayNombresDesorden, arrayRegaladores);


      console.log("FINAL: " );
      console.log(arrayNombres);
      console.log(arrayNombresDesorden);
      console.log(arrayRegaladores);
   }
}


/**
 * Desordena de forma aleatoria un array
 * @param {*} array 
 * @returns 
 */
function desordenar(array) {
   for (var i = array.length - 1; i > 0; i--) {
     var j = Math.floor(Math.random() * (i + 1)); // índice aleatorio entre 0 e i
 
     // intercambia elementos array[i] y array[j]
     // usamos la sintáxis "asignación de desestructuración" para lograr eso
     // encontrarás más información acerca de esa sintaxis en los capítulos siguientes
     // lo mismo puede ser escrito como:
     // let t = array[i]; array[i] = array[j]; array[j] = t
     //[array[i], array[j]] = [array[j], array[i]];

     var t = array[i]; 
     array[i] = array[j]; 
     array[j] = t;
   }
   return array;
 }
 
/**
 * Limpia todo lo que haya en el contenedor de anteriores sorteos
 * @param {*} array 
 * @returns 
 */
function inicializarContenedorResultados() {
   var colRegalado = document.querySelector("#colRegalado");
   var colRegalador = document.querySelector("#colRegalador");

   colRegalado.innerHTML = "";
   colRegalador.innerHTML = "";
}

/**
 * Muestra los resultados del sorteo en los input
 * @param {*} array 
 * @returns 
 */
function mostrarResultadoSorteo(arrayNombres, arrayNombresDesorden, arrayRegaladores) {
   var divResultado = document.querySelector("#resultadoSorteo");
   divResultado.setAttribute('style', 'display:block'); //muestro el div de los resultados que inicialmente estaba oculto

   //desplazamos un poco la pantalla para que se vean los resultados bien
   window.scroll({
      top: 700,
      left: 700,
      behavior: 'smooth'
    });

    //muestro los inputs para cada pareja
    //teniendo en cuenta que tengo que volver a ordenar todo para que aparezcan tal y como los 
    //ha introducido el usuario 
    for (var i=0; i<=arrayNombres.length-1; i++) {
      anadirParejaInput(arrayNombres[i] , arrayRegaladores[arrayNombresDesorden.indexOf(arrayNombres[i])]);
    } 
}

/**
 * Añade los input con los resultados a un div que estaba inicialmente oculto
 * @param {*} array 
 * @returns 
 */
function anadirParejaInput(regalado, regalador) {
   var inputRegalado = document.createElement("input");
   var inputRegalador = document.createElement("input");

   inputRegalado.setAttribute('type', 'text');
   inputRegalador.setAttribute('type', 'text');

   inputRegalado.setAttribute('readonly', 'readonly');
   inputRegalador.setAttribute('readonly', 'readonly');

   inputRegalado.className = "form-control col-sm mb-2"; // asigno una clase CSS al input
   inputRegalador.className = "form-control col-sm mb-2"; // asigno una clase CSS al input

   //asignamos los valores
   inputRegalado.value = regalado;
   inputRegalador.value = regalador;

   var parent = document.querySelector("#colRegalado");
   var parent2 = document.querySelector("#colRegalador");

   //añadimos los input al div (cada uno a su columna)
   parent.appendChild(inputRegalado);
   parent2.appendChild(inputRegalador);
}

/**
 * Muestra error al validar si no ha escrito al menos dos nombres
 * @param {*} array 
 * @returns 
 */
function mostrarMensaje(tipo, mensaje) {
   //deshabilito el botón
   var miBoton = document.querySelector("#btn-sorteo");
   miBoton.disabled = true;

   var miAlerta = document.querySelector('#miAlerta');
   
   var wrapper = document.createElement('div');
   wrapper.innerHTML = '<div id="miAlerta1" class="alert alert-' + tipo + ' alert-dismissible fade show" role="alert">' 
   + mensaje 
   + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
   miAlerta.append(wrapper);


   var miAlerta = document.querySelector("#miAlerta1");
   miAlerta.addEventListener('closed.bs.alert', function() {
      //movemos el foco al input
      document.querySelector("#nombres").focus();
      miBoton.disabled = false;
   });


   
} 


