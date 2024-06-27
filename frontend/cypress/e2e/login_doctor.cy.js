describe('Login-Médico Test', () => {
  it('Deberia iniciar sesión de forma correcta, mostrar vista gestión de Citas, atender una cita y regresar a Login.', () => {
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
    // Atiende una cita
    cy.contains('Atendido').first().click(); //cy.get('.bg-blue-500')
    cy.wait(3000);
    // Cierra sesión y regresa a Login
    cy.get("#user-menu-button").click();
    cy.wait(1500);
    cy.get('#user-menu-item-2').click();
    cy.wait(1500);
    cy.contains('MediCare').should('be.visible');
  })
})