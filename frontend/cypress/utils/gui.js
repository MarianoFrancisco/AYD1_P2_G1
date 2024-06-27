import { execSync } from 'child_process';

try {
    console.log(`Abriendo Cypress GUI`);
    execSync('npx cypress open', { stdio: 'inherit' });
    console.log(`Por favor, selecciona las pruebas en el orden deseado desde la interfaz gráfica de Cypress.`);
  } catch (error) {
    console.error(`Error al abrir Cypress GUI`, error);
    process.exit(1);
  }