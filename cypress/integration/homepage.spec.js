/// <reference types="cypress" />

describe('Carga la pagina principal', () => {
    it('Prueba el Header de la pagina principal', () => {
        cy.visit('/')

        cy.get('[data-cy="heading-sitio"]').should('exist');
        cy.get('[data-cy="heading-sitio"]').invoke('text').should('equal', 'Venta de casas y Departamentos Exclusivos de Lujo ')
    });

    it('Prueba el header de los iconos principales', () => {
        cy.get('[data-cy="heading-nosotros"]').should('exist');
        cy.get('[data-cy="heading-nosotros"]').invoke('text').should('equal', 'Mas Sobre Nosotros')
        cy.get('[data-cy="iconos-nosotros"]').should('exist');
        cy.get('[data-cy="iconos-nosotros"]').find('.icono').should('have.length', 3)
    });

    it('Prueba la seccion de propiedades', () => {
        cy.get('[data-cy="anuncio"]').should('have.length', 3);
        cy.get('[data-cy="anuncio"]').should('not.have.length', 5);

        cy.get('[data-cy="enlace-propiedad"]').should('have.class', 'boton-amarillo-bloque');

        cy.get('[data-cy="enlace-propiedad"]').first().invoke('text').should('equal', 'Ver propiedad');

        cy.get('[data-cy="enlace-propiedad"]').first().click();
        cy.get('[data-cy="titulo-propiedad"]').should('exist');

        // cy.wait(1000);
        cy.go('back');
    });

    it('Prueba el Routing hacia todas las propiedades', () => {
        cy.get('[data-cy="ver-propiedades"]').should('exist');
        cy.get('[data-cy="ver-propiedades"]').should('have.class', 'boton-verde');
        cy.get('[data-cy="ver-propiedades"]').invoke('attr', 'href').should('equal', '/propiedades');
        cy.get('[data-cy="ver-propiedades"]').click();

        cy.get('[data-cy="heading-propiedades"]').should('exist');

        // cy.wait(1000);
        cy.go('back');
    });

    it('Prueba el bloque de contactos', () => {
        cy.get('[data-cy="imagen-contacto"]').should('exist');
        cy.get('[data-cy="imagen-contacto"]').find('h2').invoke('text').should('equal', 'Encuentra la casa de tus sueños');
        cy.get('[data-cy="imagen-contacto"]').find('p').invoke('text').should('equal', 'Llena el formulario de contacto y un asesor se pondra en contacto contigo a la brevedad');

        cy.get('[data-cy="imagen-contacto"]').find('a').invoke('attr', 'href').then( href => {
            cy.visit(href)
        } );

        // cy.wait(1000);
        cy.visit('/');
    });

    it('Prueba los testimoniales y el blog', () => {
        cy.get('[data-cy="blog"]').should('exist');
        cy.get('[data-cy="blog"]').find('h3').invoke('text').should('equal', 'Nuestro blog' )
        cy.get('[data-cy="blog"]').find('h3').invoke('text').should('not.equal', 'blog' )
        cy.get('[data-cy="blog"]').find('img').should('have.length', 2);

        cy.get('[data-cy="testimoniales"]').should('exist');
        cy.get('[data-cy="testimoniales"]').find('h3').invoke('text').should('equal', 'Testimoniales' )
    });
});