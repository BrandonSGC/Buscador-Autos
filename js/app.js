// Variables.
const year = document.querySelector('#year');
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

// Contenerdor para los resultados.
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear();
const min = max - 10;


//Generar objeto para la busqueda.
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
};


// Eventos.
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    // Cargar los años.
    llenarSelect();
    
});


// Event listeners para los select de busqueda.
marca.addEventListener('change', (e) => {
    datosBusqueda.marca = e.target.value;
    filtarAuto();
});

year.addEventListener('change', (e) => {
    datosBusqueda.year = parseInt(e.target.value);
    filtarAuto();
});

minimo.addEventListener('change', (e) => {
    datosBusqueda.minimo = parseInt(e.target.value);
    filtarAuto();
});

maximo.addEventListener('change', (e) => {
    datosBusqueda.maximo = parseInt(e.target.value);
    filtarAuto();
});

puertas.addEventListener('change', (e) => {
    datosBusqueda.puertas = parseInt(e.target.value);
    filtarAuto();
});

transmision.addEventListener('change', (e) => {
    datosBusqueda.transmision = e.target.value;
    filtarAuto();
});

color.addEventListener('change', (e) => {
    datosBusqueda.color = e.target.value;
    filtarAuto();
});


// Funciones.
function mostrarAutos(autos) {
    limpiarHTML();
    autos.forEach(auto => {        
        // Creamos el elemento para mostrar cada uno de los carros.
        const autoHTML = document.createElement('p');

        /* Hacemos destructuring de cada objeto carro para no usar 
        la sintaxis de puntos. */
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        
        // Agregamos el contenido al elemento.
        autoHTML.textContent = `
            ${marca} ${modelo} - ${puertas} Puertas - Transmisión: ${transmision} - 
            Precio: ${precio} - Color: ${color}`;

        // Insertar el elemento al HTML.
        resultado.appendChild(autoHTML);
    })
}


// Limpiar HTML
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}


// Genera los  años del select.
function llenarSelect() {         
    for (let i = max; i > min; i--) {
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }
}


// Funcion que en cadena nos va a filtrar por todos los atributos
// del carro.
function filtarAuto() {
    const resultado = autos.filter( filtrarMarca ).filter( filtarYear ).filter( filtrarMinimo ).filter( filtrarMaximo ).filter( filtrarPuertas ).filter( filtrarTransmision ).filter( filtrarColor );
    
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        sinResultados();
    }
    
}

function filtrarMarca(auto) {
    const {marca} = datosBusqueda;
    
    if (marca) {
        return auto.marca === datosBusqueda.marca;
    }
    return auto;
}

function filtarYear(auto) {
    const {year} = datosBusqueda;
    
    if (year) {
        return auto.year === datosBusqueda.year;
    }
    return auto;
};

function filtrarMinimo(auto) {
    const {minimo} = datosBusqueda;
    
    if (minimo) {
        return auto.precio >= minimo;
    }
    return auto;
}

function filtrarMaximo(auto) {
    const {maximo} = datosBusqueda;
    
    if (maximo) {
        return auto.precio <= maximo;
    }
    return auto;
}

function filtrarPuertas(auto) {
    const {puertas} = datosBusqueda;

    if (puertas) {
        return auto.puertas === datosBusqueda.puertas;
    }
    return auto;
}

function filtrarTransmision (auto) {
    const {transmision} = datosBusqueda;

    if (transmision) {
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}

function filtrarColor(auto) {
    const {color} = datosBusqueda;

    if (color) {
        return auto.color === datosBusqueda.color;
    }
    return auto;
}

function sinResultados() {
    limpiarHTML();
    const sinResultado = document.createElement('p')
    sinResultado.classList.add('alerta', 'error')
    sinResultado.textContent = 'No se encontraron resultados.';
    resultado.appendChild(sinResultado);
}