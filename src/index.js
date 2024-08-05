import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

document.addEventListener('DOMContentLoaded', () => {
    console.log('El documento está listo!');

    // Ejemplo de uso de Toastify
    Toastify({
        text: "¡41 personas estan viendo esto!",
        duration: 3000,
        style: {
            background: "#999",
        },
    }).showToast();

    // Ejemplo de uso de Toastify despues de 5 segundos con duracion de 3000 milisegundos
    setTimeout(() => {
        Toastify({
            text: "¡José López \n acaba de generar ₡2.940.283 \n de un depósito de ₡135.000!",
            duration: 3000,
            style: {
                background: "#fff",
                color: "#000",
            },
        }).showToast();
    }, 5000);

});
