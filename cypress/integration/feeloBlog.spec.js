/// <reference types="cypress" />


describe('feelo blog', () => {
    beforeEach(() => {
        cy
            .visit('/')

        Cypress.on('uncaught:exception', (err, runnable) => {
            // returning false here prevents Cypress from
            // failing the test
            debugger
            return false
        })
    })

    it('should have an "active reader" element visible', () => {
        cy
            .get('.right-content > p')
            .should('be.visible')
    })

    it('should have a hidden "active reader" element, when viewport is the size for iPhone 6', () => {
        cy
            .viewport('iphone-6')

        cy
            .get('.right-content > p')
            .should('be.hidden')
    })

    it('should have a logo element wide 100px at most', () => {
        cy
            .viewport('iphone-6')

        cy
            .get('.logo a')
            .should((logo) => {
                expect(Number(logo.css('width').slice(0, -2)))
                    .to.not.be.greaterThan(100)
            })

        cy
            .viewport('iphone-6', 'landscape')

        cy
            .get('.logo a')
            .should((logo) => {
                expect(Number(logo.css('width').slice(0, -2)))
                    .to.not.be.greaterThan(120)
            })
    })

    it('should have a hamburger button that is hidden when not in phone layout', () => {
        cy
            .viewport(990, 768)

        cy
            .get('.main-manu .manu-btn')
            .should('be.hidden')
    })

    it('should have a hamburger button that when clicked opens a side bar', () => {
        cy
            .viewport(990, 768)

        cy
            .get('.main-manu .manu-btn')
            .click()

        cy
            .get('.manu-list.active')
            .should('be.visible')
    })

    it('should have an open sidebar that closes when clicking the x button', () => {
        cy
            .viewport(990, 768)

        cy
            .get('.main-manu .manu-btn')
            .click()

        cy
            .get('.manu-list.active .close-btn')
            .click()

        cy
            .get('.manu-list')
            .should('be.hidden')
    })
})
