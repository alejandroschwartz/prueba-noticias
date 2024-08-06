import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import intlTelInput from 'intl-tel-input';
import 'intl-tel-input/build/css/intlTelInput.css';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

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

    // Ejemplo de Toast con css para cargar las imagenes
    setTimeout(() => {
        const toast = document.getElementById('toast-card');
        toast.style.display = 'block';
        toast.classList.remove('toast-hide');
    
        setTimeout(() => {
            toast.classList.add('toast-hide');
            setTimeout(() => {
                toast.style.display = 'none';
            }, 500);
        }, 5000);
    }, 8000);
});


document.addEventListener("DOMContentLoaded", () => {
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

    let countryData;
    input.addEventListener('countrychange', () => {
        countryData = iti.getSelectedCountryData();
    });

    const form = document.querySelector("form");
    const resultado = document.createElement("div");
    form.after(resultado);

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Obtengo los valores de los campos del formulario
        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const email = document.getElementById("email").value;
        const phone = `+${countryData.dialCode} ${document.getElementById("phone").value}`;
        const phoneParse = parsePhoneNumber(phone, countryData.country);
        
        // Verifico el número de teléfono ingresado
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
