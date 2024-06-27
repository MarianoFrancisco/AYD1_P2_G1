describe('Programar-Horario-Medico Test', () => {
    it('Deberia iniciar sesión, mostrar vista gestión de Citas, atender una cita y regresar a Login.', () => {
      cy.visit('http://localhost:5173/login')
  
      cy.wait(1000);
      cy.get('#email').type("cecilia@gmail.com");
      cy.wait(1000);
      cy.get('#password').type("123456789A");
      cy.wait(1000);
      cy.contains('MediCare').should('be.visible');
      cy.wait(1000);
      cy.get(':nth-child(3) > .flex').click(); //cy.get('form').submit();
      cy.wait(1000);
      // Ingresa a página gestión de citas 
      cy.url().should('include', '/doctor-home');
      cy.wait(1500);
      // Se va a página vista de horarios
      cy.get('.ml-10 > :nth-child(3)').click();
      cy.wait(1000);
      cy.contains('Horario de Atención').should('be.visible');
      cy.wait(4000);
      // Establece nuevo Horario de atencion
      cy.get('.ml-10 > :nth-child(4)').click();
      cy.wait(1500);
      cy.get(':nth-child(1) > .inline-flex').click();
      cy.wait(1500);
      cy.get(':nth-child(4) > .inline-flex').click();
      cy.wait(1500);
      cy.get(':nth-child(6) > .inline-flex').click();
      cy.wait(1500);
      //vuelve activar a Jueves
      cy.get(':nth-child(4) > .inline-flex').click();
      cy.wait(1500);
      cy.get(':nth-child(1) > .pt-3').cle //hora inicio
      cy.get(':nth-child(1) > .pt-3').select("8");
      cy.get(':nth-child(1) > .pt-3').should('have.value', "8");
      cy.wait(1500);
      cy.get(':nth-child(2) > .pt-3').cle //hora fin
      cy.get(':nth-child(2) > .pt-3').select("16");
      cy.get(':nth-child(2) > .pt-3').should('have.value', "16");
      cy.wait(1500);
      cy.get('form > .justify-center').click()//boton guardar cambios
      cy.wait(5000);
      cy.get('.swal2-confirm').click();
      cy.wait(2000);
      // Se va a página vista de horarios
      cy.get('.ml-10 > :nth-child(3)').click();
      cy.wait(1000);
      cy.contains('Horario de Atención').should('be.visible');
      cy.wait(4000);
      // Cierra sesión y regresa a Login
      cy.get("#user-menu-button").click();
      cy.wait(1500);
      cy.get('#user-menu-item-2').click();
      cy.wait(2000);
      cy.contains('MediCare').should('be.visible');
    })
  })