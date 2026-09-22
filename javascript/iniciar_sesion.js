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


  // 3. Procesar el envío de Iniciar Sesión

  formLogin.addEventListener('submit', (e) => {

    e.preventDefault();

    const usuario = document.getElementById('login-user').value;
    const password = document.getElementById('login-pass').value;


    // Validar que los campos no estén vacíos

    if (usuario.trim() !== "" && password.trim() !== "") {

      alert(`¡Bienvenido de nuevo, ${usuario}!`);

    } else {

      alert("Por favor completa las casillas requeridas.");

    }

  });

});