describe('Login-Incorrecto Test', () => {
    it('Deberia ingresar datos incorrectos, mostrar un mensaje de Error y redirigir a Login', () => {
      cy.visit('http://localhost:5173/login')
  
      cy.wait(1000);
      cy.get('#email').type("danilo@gmail.com");
      cy.wait(1000);
      cy.get('#password').type("123456789B");
      cy.wait(1000);
      cy.get('form').submit();//cy.get(':nth-child(3) > .flex').click();
      cy.wait(1000);
      // Muestra mensaje de error
      cy.contains('Error al iniciar sesión').should('be.visible');
      cy.wait(1400);
      cy.get('.swal2-confirm').click();
      cy.wait(1000);
      cy.reload();
    })
  })