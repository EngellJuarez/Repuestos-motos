// Selección de elementos del DOM
const btnSignIn = document.getElementById("sign-in");
const btnSignUp = document.getElementById("sign-up");
const containerFormRegister = document.querySelector(".register");
const containerFormLogin = document.querySelector(".login");
const formRegister = document.querySelector('.form-register');
const formLogin = document.querySelector('.form-login');

// Evento para cambiar a formulario de inicio de sesión
btnSignIn.addEventListener("click", () => {
    containerFormRegister.classList.add("hide");
    containerFormLogin.classList.remove("hide");
});

// Evento para cambiar a formulario de registro
btnSignUp.addEventListener("click", () => {
    containerFormLogin.classList.add("hide");
    containerFormRegister.classList.remove("hide");
});

// Función para guardar usuarios en localStorage
function saveUserToLocalStorage(user) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

// Función para buscar un usuario por correo electrónico en localStorage
function getUserFromLocalStorage(email) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    return users.find(user => user.userEmail === email);
}

// Evento para validar y procesar el registro
formRegister.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validación de campos
    const userName = formRegister.querySelector('input[name="userName"]').value.trim();
    const userEmail = formRegister.querySelector('input[name="userEmail"]').value.trim();
    const userPassword = formRegister.querySelector('input[name="userPassword"]').value.trim();

    if (userName === "" || userEmail === "" || userPassword === "") {
        displayError("Todos los campos son obligatorios", formRegister);
        return;
    }

    // Validación de nombre de usuario (puedes ajustar según tus requerimientos)
    if (userName.length < 4) {
        displayError("El nombre de usuario debe tener<br>al menos 4 caracteres", formRegister);
        return;
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        displayError("Correo electrónico no válido", formRegister);
        return;
    }

    // Validación de contraseña
    if (userPassword.length < 6) {
        displayError("La contraseña debe tener<br>al menos 6 caracteres", formRegister);
        return;
    }

    // Verificar si el usuario ya está registrado
    if (getUserFromLocalStorage(userEmail)) {
        displayError("El correo electrónico ya está registrado", formRegister);
        return;
    }

    // Guardar usuario en localStorage
    const newUser = { userName, userEmail, userPassword };
    saveUserToLocalStorage(newUser);

    // Mostrar mensaje de éxito y limpiar formulario
    displaySuccess("Te registraste correctamente");
    formRegister.reset();
});

// Evento para validar y procesar el inicio de sesión
formLogin.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validación de campos
    const userEmail = formLogin.querySelector('input[name="userEmail"]').value.trim();
    const userPassword = formLogin.querySelector('input[name="userPassword"]').value.trim();

    if (userEmail === "" || userPassword === "") {
        displayError("Todos los campos son obligatorios", formLogin);
        return;
    }

    // Buscar usuario en localStorage
    const user = getUserFromLocalStorage(userEmail);

    if (!user) {
        displayError("El correo electrónico no está registrado", formLogin);
        return;
    }

    // Verificar contraseña
    if (user.userPassword !== userPassword) {
        displayError("Contraseña incorrecta", formLogin);
        return;
    }

    // Mostrar mensaje de éxito y redireccionar al usuario
    displaySuccess("Inicio de sesión exitoso");

    // Redireccionar al usuario al index.html después de 1 segundo
    setTimeout(() => {
        window.location.href = "index2.html";
    }, 1000);
});

// Función para mostrar mensaje de error
function displayError(message, formElement) {
    const errorElement = formElement.querySelector('.alerta-error');
    errorElement.innerHTML = message;
    errorElement.style.display = "block";

    setTimeout(() => {
        errorElement.style.display = "none";
    }, 3000); // Ocultar mensaje de error después de 3 segundos
}

// Función para mostrar mensaje de éxito
function displaySuccess(message) {
    const successElement = document.querySelector('.alerta-exito');
    successElement.textContent = message;
    successElement.style.display = "block";

    setTimeout(() => {
        successElement.style.display = "none";
    }, 3000); // Ocultar mensaje de éxito después de 3 segundos
}



