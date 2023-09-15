/// <reference types='cypress' />
const {
  createRegistrationData,
  fillIn
} = require('../support/regFunctions');

const {
  registrationPage,
  firstName,
  lastName,
  email,
  mobilePhone,
  currentAddress,
  randomHobby,
  randomYear,
  randomDate
} = createRegistrationData();
const success = 'Thanks for submitting the form';

describe('Student Registration page', () => {
  beforeEach(() => {
    cy.visit(registrationPage);
  });

  it('should register new user with valid credentials', () => {
    fillIn('firstName', firstName);
    fillIn('lastName', lastName);
    fillIn('userEmail', email);
    fillIn('userNumber', mobilePhone);
    fillIn('currentAddress', currentAddress);

    cy.get('[for="gender-radio-1"]').click();
    cy.get(`[for="hobbies-checkbox-${randomHobby}"]`).click();

    cy.get('#state').type(`Uttar{enter}`);
    cy.get('#city').type(`Agra{enter}`);

    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__year-select').select(randomYear);
    cy.get(`.react-datepicker__day--0${randomDate}`).click();

    cy.get('#submit').click();
    cy.get('#example-modal-sizes-title-lg').should('contain', success);
  });
});
