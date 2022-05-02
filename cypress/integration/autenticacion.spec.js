/// <reference types="cypress" />

describe('Probar la Autenticacion', () => {
    it('Prueba la Autenticacion en /login', () => {
        cy.visit('/login');

        cy.get('[data-cy="heading-login"]').should('exist');

        cy.get('[data-cy="formulario-login"]').should('exist');

        cy.get('[data-cy="formulario-login"]').submit();
        cy.get('[data-cy="alerta-login"]').should('exist');
        cy.get('[data-cy="alerta-login"]').first().should('have.class', 'error').and('have.class', 'alerta');
        
    });
});