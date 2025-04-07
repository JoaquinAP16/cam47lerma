// Archivo de configuración para el despliegue
const DEPLOYMENT_CONFIG = {
  version: '1.0.0',
  appName: 'Menú Interactivo - Taller de Bebidas y Alimentos',
  deploymentDate: new Date().toISOString(),
  features: {
    offlineSupport: true,
    dataSync: true,
    iconGallery: true,
    responsiveDesign: true
  },
  defaultSettings: {
    theme: {
      primaryColor: '#3498db',
      secondaryColor: '#2ecc71',
      fontSize: 'medium'
    },
    syncInterval: 5 // minutos
  }
};

// No modificar esta sección - Configuración de despliegue
window.DEPLOYMENT_CONFIG = DEPLOYMENT_CONFIG;
console.log('Menú Interactivo inicializado en modo de producción');
