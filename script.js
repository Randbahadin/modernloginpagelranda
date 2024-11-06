const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

const password = document.getElementById('password');
const showPassword = document.getElementById('showPassword');
const eye = document.getElementById('eye');

showPassword.addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = 'text';
    eye.classList.remove('fa-eye');
    eye.classList.add('fa-eye-slash');
  } else {
    password.type = 'password';
    eye.classList.remove('fa-eye-slash');
    eye.classList.add('fa-eye');
  }
});

const rPassword = document.getElementById('rPassword');
const rShowPassword = document.getElementById('rShowPassword');
const rEye = document.getElementById('rEye');

rShowPassword.addEventListener('click', () => {
  if (rPassword.type === 'password') {
    rPassword.type = 'text';
    rEye.classList.remove('fa-eye');
    rEye.classList.add('fa-eye-slash');
  } else {
    rPassword.type = 'password';
    rEye.classList.remove('fa-eye-slash');
    rEye.classList.add('fa-eye');
  }
});

function refresh() {
  setTimeout(() => {
    window.location.reload();
  }, 500);
}
