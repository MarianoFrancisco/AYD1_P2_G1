describe('Registro-Paciente Test', () => {
  it('Deberia iniciar sesión de forma correcta, mostrar vista gestión de Citas, atender una cita y regresar a Login.', () => {
    cy.visit('http://localhost:5173/register')

    cy.wait(1000);
    cy.get('#email').type("marisa@gmail.com");
    cy.wait(1000);
    cy.get('#first_name').type("Marisa");
    cy.wait(1000);
    cy.get('#last_name').type("Valle");
    cy.wait(1000);
    cy.get('#gender_id').select("2");
    cy.get('#gender_id').should('have.value', "2");
    cy.wait(1000);
    cy.get('#birth_date').type("1999-03-10");
    cy.wait(1000);
    cy.get('#role_id').select("1");
    cy.get('#role_id').should('have.value', "1");
    cy.wait(1000);
    // Selecciona el campo de archivo y sube una imagen
    //cy.get('#photo').selectFile('C:\Users\Mariano\Downloads\estrella.jpg'); // Reemplaza con el path de imagen de Mariano
    cy.get('#photo').selectFile('C:/Users/cecil/OneDrive/Desktop/ayd_pictures/woman.jpg'); // Reemplaza con el path de imagen de Mariano
    // Verifica que el archivo se haya seleccionado correctamente
    cy.wait(500);
    cy.get('#photo').should(($input) => {
      const files = $input[0].files;
      expect(files).to.have.length(1);
      //expect(files[0].name).to.equal('estrella.jpg');}); // Reemplaza con el nombre de imagen de Mariano
      expect(files[0].name).to.equal('woman.jpg');}); // Reemplaza con el nombre de imagen de Mariano
    cy.wait(1000);
    cy.get('#password').type("123456789Z");
    cy.wait(1000);
    cy.get('#confirm_password').type("123456789Z");
    cy.wait(1000);
    cy.get(':nth-child(10) > .flex').click();
    cy.wait(2000);
    cy.contains('MediCare').should('be.visible');
    })
  })