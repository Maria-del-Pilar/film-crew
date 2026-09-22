document.addEventListener('DOMContentLoaded', () => {

  // 1. Selección de elementos HTML

  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');

  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');


  // 2. Funciones para cambiar entre las pestañas

  function mostrarLogin() {

    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');

    formLogin.classList.add('active');
    formRegister.classList.remove('active');

  }


  function mostrarRegistro() {

    tabRegister.classList.add('active');
    tabLogin.classList.remove('active');

    formRegister.classList.add('active');
    formLogin.classList.remove('active');

  }


  // Eventos de clic en las pestañas

  tabLogin.addEventListener('click', mostrarLogin);

  tabRegister.addEventListener('click', mostrarRegistro);


  // 3. Procesar el envío de Crear Cuenta

  formRegister.addEventListener('submit', (e) => {

    e.preventDefault();

    const nombre = document.getElementById('reg-nombre').value;
    const celular = document.getElementById('reg-celular').value;
    const correo = document.getElementById('reg-correo').value;

    const day = document.getElementById('dob-day').value;
    const month = document.getElementById('dob-month').value;
    const year = document.getElementById('dob-year').value;


    // Validación básica de la fecha

    if (day > 31 || month > 12 || year.length < 4) {

      alert("Por favor ingresa una fecha de nacimiento válida (DD/MM/YYYY).");

      return;

    }


    // Confirmación de registro

    alert(`¡Cuenta creada exitosamente para ${nombre}!
Se ha enviado una confirmación a ${correo}.`);


    // Limpiar el formulario

    formRegister.reset();


    // Regresar al formulario de Login

    mostrarLogin();

  });

});