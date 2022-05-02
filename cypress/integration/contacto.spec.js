/// <reference types="cypress" />

describe('Prueba el formulario de contacto', () => {
    it('Prueba la pagina de contacto y el envio de emails', () => {
        cy.visit('/contacto');

        cy.get('[data-cy="heading-contacto"]').should('exist');
        cy.get('[data-cy="heading-contacto"]').invoke('text').should('equal', 'Contacto');

        cy.get('[data-cy="heading-formulario"]').should('exist');
        cy.get('[data-cy="heading-formulario"]').invoke('text').should('equal', 'Llene el formulario de Contacto');

        cy.get('[data-cy="formulario-contacto"]').should('exist');
    });

    it('Llena los campos del formulario', () => {
        cy.get('[data-cy="input-nombre"]').type('Lautaro');
        cy.get('[data-cy="input-mensaje"]').type('Deseo comprar una casa');
        cy.get('[data-cy="input-opciones"]').select('Compra');
        cy.get('[data-cy="input-precio"]').type('1200000');
        cy.get('[data-cy="forma-contacto"]').eq(1).check();
        cy.get('[data-cy="input-email"]').type('correo@correo.com');

        cy.wait(3000);

        cy.get('[data-cy="forma-contacto"]').eq(0).check();
        cy.get('[data-cy="input-telefono"]').type('1232456543');
        cy.get('[data-cy="input-fecha"]').type('2021-09-30');
        cy.get('[data-cy="input-hora"]').type('10:30');

        cy.get('[data-cy="formulario-contacto"]').submit();

        cy.get('[data-cy="alerta-envio-formulario"]').should('exist');
        cy.get('[data-cy="alerta-envio-formulario"]').invoke('text').should('equal', ' Mensaje enviado Correctamente');
        cy.get('[data-cy="alerta-envio-formulario"]').should('have.class', 'alerta').and('have.class', 'exito');


    });
});