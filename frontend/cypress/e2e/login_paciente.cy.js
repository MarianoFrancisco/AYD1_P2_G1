describe('Login-Paciente Test', () => {
    it('Deberia iniciar sesión de forma correcta, mostrar página princial, actualizar Perfil y regresar a Login.', () => {
      cy.visit('http://localhost:5173/login')
  
      cy.wait(1000);
      cy.get('#email').type("esau@gmail.com");
      cy.wait(1000);
      cy.get('#password').type("123456789V");
      cy.wait(1000);
      cy.contains('MediCare').should('be.visible');
      cy.wait(1000);
      cy.get(':nth-child(3) > .flex').click(); //cy.get('form').submit();
      cy.wait(1000);
      // Ingresa a página principal 
      cy.url().should('include', '/patient-home');
      cy.wait(1000);
      // Editar Perfil
      //cy.contains();
      //cy.wait(1000);
      // Cierra sesión y regresa a Login
      cy.get('button > .text-white').click();
      cy.wait(1500);
      cy.contains('Cerrar sesión').click();
      cy.wait(1000);
      cy.contains('MediCare').should('be.visible');
    })
  })