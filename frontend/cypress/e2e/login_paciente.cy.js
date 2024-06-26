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
      cy.get(':nth-child(3) > .flex').click();
      cy.wait(1000);
      // Ingresa a página principal 
      cy.url().should('include', '/patient-home');
      cy.wait(1500);
      // Editar Perfil
      cy.get('button > .text-white').click();
      cy.wait(1500);
      cy.get('.absolute > :nth-child(1)').click(); //Boton editar Perfil
      cy.wait(1000);
      cy.get('#first_name').clear().type("Angel Esau");
      cy.wait(1000);
      cy.get('#last_name').clear().type("Cardenas");
      cy.wait(1000);
      cy.get('#birth_date').invoke('val', '1994-03-10').trigger('change');
      cy.wait(1500);
      cy.get('.bg-gray-800').click(); //Boton Guardar cambios
      cy.wait(3000);
      cy.get('.swal2-confirm').click();
      cy.wait(1500);
      //Regresa a página principal
      cy.get('.bg-gray-900 > .flex > :nth-child(2)').click();
      cy.wait(3000);
      cy.contains('Angel Esau').should('be.visible');;
      cy.wait(1000);
      // Cierra sesión y regresa a Login
      cy.get('.relative > :nth-child(1) > .text-gray-400').click();
      cy.wait(1500);
      cy.contains('Cerrar sesión').click();
      cy.wait(1000);
      cy.contains('MediCare').should('be.visible');
    })
  })