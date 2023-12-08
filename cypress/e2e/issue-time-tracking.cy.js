describe('Issue time tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueTrackingModal = () => cy.get('[data-testid="modal:tracking"]');
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const value ="10";
    const newValue= "20"

    it('Can add, update and remove estimation', () => {
        getIssueDetailsModal().within(() => {
            cy.get('input[placeholder="Number"]').clear().type(value);
            cy.contains(value).should("exist");
            cy.contains(`${value}${'h estimated'}`).should('be.visible');

            cy.get('input[placeholder="Number"]').clear().type(newValue);
            cy.contains(newValue).should("exist");
            cy.contains(value).should("not.exist");
            cy.contains(`${newValue}${'h estimated'}`).should('be.visible');

            cy.get('input[placeholder="Number"]').clear();
            
            cy.contains(newValue).should("not.exist");
            cy.contains(`${newValue}${'h estimated'}`).should('not.exist');
        });  
    });

    const timeSpent= '2';
    const timeRemaining= '5';

    it('Log and remove logged time', () => {
        cy.get('[data-testid="icon:stopwatch"]').click();
        getIssueTrackingModal().should('be.visible')
        getIssueTrackingModal().within(() => {
            cy.get('input[placeholder="Number"]')
                .first()
                .clear()
                .type(timeSpent);
            cy.get('input[placeholder="Number"]')
                .last()
                .clear()
                .type(timeRemaining);
            });
        getIssueTrackingModal()
            .contains('button', 'Done')
            .click()
            .should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
        cy.contains("No time logged").should('not.exist')
        cy.contains(`${timeSpent}${'h logged'}`).should('be.visible');
        cy.contains(`${timeRemaining}${'h remaining'}`).should('be.visible');

        cy.get('[data-testid="icon:stopwatch"]').click();
        getIssueTrackingModal().should('be.visible').within(() => {
            cy.get('input[placeholder="Number"]')
                .first()
                .clear()
            cy.get('input[placeholder="Number"]')
                .last()
                .clear()
            });
        getIssueTrackingModal()
            .contains('button', 'Done')
            .click()
            .should('not.exist');
        cy.get('[data-testid="modal:issue-details"]').should("be.visible")
        cy.contains("No time logged").should("be.visible")
    });
});