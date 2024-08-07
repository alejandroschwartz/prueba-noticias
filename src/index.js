import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

// Creo un array con datos de las personas para mostrar aleatoriamente en la tabla
const users = [
    { id: "1", nombre: "Josefa", ganancia: "770.930", ciudad: "Ciudad de México" },
    { id: "2", nombre: "Ana", ganancia: "1.126.880", ciudad: "Buenos Aires" },
    { id: "3", nombre: "Carmen", ganancia: "827.538", ciudad: "São Paulo" },
    { id: "4", nombre: "Rosa", ganancia: "1.032.190", ciudad: "Río de Janeiro" },
    { id: "5", nombre: "Laura", ganancia: "1.264.743", ciudad: "Bogotá" },
    { id: "6", nombre: "Marta", ganancia: "1.168.444", ciudad: "Lima" },
    { id: "7", nombre: "Flor", ganancia: "940.952", ciudad: "Santiago" },
    { id: "8", nombre: "Andrea", ganancia: "289.139", ciudad: "Caracas" },
    { id: "9", nombre: "Adriana", ganancia: "622.601", ciudad: "Quito" },
    { id: "10", nombre: "Olga", ganancia: "389.628", ciudad: "La Paz" },
    { id: "11", nombre: "Sara", ganancia: "1.285.890", ciudad: "Montevideo" },
    { id: "12", nombre: "María", ganancia: "353.994", ciudad: "Asunción" },
    { id: "13", nombre: "Luisa", ganancia: "888.908", ciudad: "San Salvador" },
    { id: "14", nombre: "Sofía", ganancia: "1.294.696", ciudad: "Ciudad de Guatemala" },
    { id: "15", nombre: "Elena", ganancia: "708.162", ciudad: "Tegucigalpa" },
    { id: "16", nombre: "Rita", ganancia: "965.190", ciudad: "Managua" },
    { id: "17", nombre: "Clara", ganancia: "650.200", ciudad: "San José" },
    { id: "18", nombre: "Paula", ganancia: "231.428", ciudad: "Santo Domingo" },
    { id: "19", nombre: "Ana", ganancia: "609.621", ciudad: "La Habana" },
    { id: "20", nombre: "Carmen", ganancia: "1.235.265", ciudad: "Panamá" },
];

document.addEventListener('DOMContentLoaded', () => {

    // Ejemplo de uso de Toastify
    setTimeout(() => {
        Toastify({
            text: "¡41 personas están viendo esto!",
            duration: 3000,
            style: {
                background: "#777",
            },
        }).showToast();
    }, 2000);

    // Ejemplo de Toast con css para cargar las imagenes que comienza a los 8 segundos
    setTimeout(() => {
        const toast = document.getElementById('toast-card');
        toast.style.display = 'block';
        toast.classList.remove('toast-hide');
        // Desaparece a los 5 segundos despues de empezar
        setTimeout(() => {  
            toast.classList.add('toast-hide');
            // Efecto de 500milisegnuos para desaparecer
            setTimeout(() => {
                toast.style.display = 'none';
            }, 500);
        }, 5000);
    }, 8000);

    // Creo el cuerpo de la tabla con los datos de personas con solo 10 personas aleatorias
    const tbody = document.querySelector('table tbody');
    function updateTable() {
        const randomUsers = users.sort(() => 0.5 - Math.random());
        const randomSelection = randomUsers.slice(0, 10);
        const filasHtml = randomSelection.map(dato => `
            <tr>
                <td>${dato.nombre}</td>
                <td class="text-success">₡ ${dato.ganancia}</td>
                <td>${dato.ciudad}</td>
            </tr>
        `).join('');
        tbody.innerHTML = filasHtml;
    }
    updateTable(); // Es para la carga inicial de la tabla
    setInterval(updateTable, 5000); // Actualizo la tabla cada 5 segundos

    // Calculo de la fecha actual 
    let fechaActual = new Date();
    let opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    let fechaFormateada = new Intl.DateTimeFormat('es-ES', opciones).format(fechaActual);
    document.getElementById('fechaActual').textContent = fechaFormateada;

    // Función para cerrar la barra inferior
    window.barraInferior = function() {
        document.getElementById('barraInferior').style.display = 'none';
    };

    // Traigo el input de teléfono y lo inicializo la libreria intlTelInput con el codigo del pais del usuario
    const input = document.querySelector("#phone");
    const iti = intlTelInput(input, {
        initialCountry: "auto",
        separateDialCode: true,
        geoIpLookup: (success, failure) => {
            fetch("https://ipapi.co/json")
                .then((res) => res.json())
                .then((data) => success(data.country_code))
                .catch(() => failure());
        }
    });

    // inicio variable y guardo el pais seleccionado para concatenar a lo escrito y luego validarlo con la libreria libphonenumber-js
    let countryData;
    input.addEventListener('countrychange', () => {
        countryData = iti.getSelectedCountryData();
    });

    const form = document.querySelector("form");
    const resultado = document.createElement("div");
    form.after(resultado);

    // envento de submit al clickear el boton "¡REGISTRARME AHORA!"
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obtengo los valores de los campos del formulario
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const email = document.getElementById("email").value;
        const phone = `+${countryData.dialCode} ${document.getElementById("phone").value}`;
        const phoneParse = parsePhoneNumber(phone, countryData.country);
        
        // Verifico el número de teléfono ingresado con la libreria libphonenumber-js
        if (!isValidPhoneNumber(phoneParse.number, phoneParse.country)) {
            resultado.innerHTML = `
                <div class="container-fluid text-center alert alert-danger" role="alert">
                    El número de teléfono no es válido.
                </div>
            `;
            resultado.style.color = "red";
            return;
        }

        // Verifico que los campos del formulario no estén vacíos
        if (!name || !email || !surname || !phone) {
            resultado.innerHTML = `
                <div class="container-fluid text-center alert alert-danger" role="alert">
                    Por favor, completa todos los campos.
                </div>
            `;
            resultado.style.color = "red";
            return;
        }

        // Muestro los datos ingresados en el formulario
        resultado.innerHTML = `
            <div class="container-fluid text-center alert alert-success d-flex flex-column" role="alert">
                <h4>¡FELICIDADES!</h4>
                <br/>
                <p>
                    Los datos ingresados son: <strong>Nombre:</strong> ${name}
                    , <strong>Apellido:</strong> ${surname}
                    , <strong>Email:</strong> ${email}
                    , <strong>Teléfono:</strong> ${phone}
                </p>
            </div>
        `;
        resultado.style.color = "green";
    });
});
