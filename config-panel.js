
function openConfig() {
  const pwd = prompt("Ingresa la contraseña:");
  if (pwd === "camlerma47") {
    document.getElementById('config-panel').classList.remove('hidden');
  } else {
    alert("Contraseña incorrecta.");
  }
}
function closeConfig() {
  document.getElementById('config-panel').classList.add('hidden');
}
