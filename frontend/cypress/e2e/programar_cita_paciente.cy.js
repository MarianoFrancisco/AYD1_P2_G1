describe('Programar-Cita-Paciente Test', () => {
    it('Deberia iniciar sesión, Seleccionar un doctor, agendar cita y regresar a Login.', () => {
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
      // Selecciona el doctor y agenda cita
      cy.get(':nth-child(9) > .p-4 > .mt-3 > .bg-blue-500').click();
      cy.wait(1500);
      cy.get('.react-datepicker__input-container > .border').clear().type("2024-06-28");//esta todo lleno 
      cy.wait(1500);
      cy.get('.ml-2').click();
      cy.wait(5000);
      cy.get('.react-datepicker__input-container > .border').clear().type("2024-06-30");//dia y horario comodo
      cy.wait(1500);
      cy.get('.ml-2').click();
      cy.wait(4000);
      //sigue
      cy.get('.cursor-pointer > .mr-2').click();
      cy.wait(2000);
      cy.get('#motivoCita').type("Amsiedad calificación jsjs");
      cy.wait(1500);
      cy.get('form > .bg-blue-500').click();
      cy.wait(3000);
      cy.get('.swal2-confirm').click();
      cy.wait(3000);
      // Cierra sesión y regresa a Login
      cy.url().should('include', '/patient-home');
      cy.wait(1500);
      cy.get('button > .text-white').click();
      cy.wait(1500);
      cy.contains('Cerrar sesión').click();
      cy.wait(2000);
      cy.contains('MediCare').should('be.visible');
    })
  })