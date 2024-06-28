import { execSync } from 'child_process';
import { readFileSync } from 'fs';

const testOrder = JSON.parse(readFileSync('cypress/utils/order.json', 'utf8'));

testOrder.forEach(testFile => {
  try {
    console.log(`Abriendo Cypress para la prueba: ${testFile}`);
    execSync(`npx cypress open --spec ${testFile}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error al abrir Cypress para la prueba: ${testFile}`, error);
    process.exit(1);
  }
});