
// Inyecta el nombre y logo en la parte superior izquierda
document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.app-header');
  if (!header || !window.schoolSettings) return;

  const logo = document.createElement('img');
  logo.src = window.schoolSettings.logoURL;
  logo.alt = 'Logo de la escuela';
  logo.style.width = '40px';
  logo.style.height = '40px';
  logo.style.marginRight = '10px';

  const schoolName = document.createElement('h2');
  schoolName.textContent = window.schoolSettings.schoolName;
  schoolName.style.margin = '0';
  schoolName.style.fontSize = '1.1rem';

  const schoolInfo = document.createElement('div');
  schoolInfo.style.display = 'flex';
  schoolInfo.style.alignItems = 'center';
  schoolInfo.appendChild(logo);
  schoolInfo.appendChild(schoolName);

  header.insertBefore(schoolInfo, header.firstChild);
});
