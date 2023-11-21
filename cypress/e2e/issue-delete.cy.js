describe('Issue deletion', () => {
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');

    beforeEach(() => {
      cy.visit('/');
      cy.url().should('eq', `${Cypress.env('baseUrl')}project`).then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
        cy.get('[data-testid="modal:issue-details"]').should('be.visible')
      });
    });
  
    it('Delete issue and confirm the deletion was successful', () => {
      getIssueDetailsModal().within(() => {
        cy.get('[data-testid="icon:trash"]').click();
        });

        cy.contains('button', 'Delete issue')
                .click()
                .should('not.exist');
        cy.contains('Issue has successfully been deleted').should('not.exist')
        cy.contains('This is an issue of type: Task.').should('not.exist');
        cy.reload()
    });
   
    it('Delete issue but cancel before deleting', () => {
        getIssueDetailsModal().within(() => {
          cy.get('[data-testid="icon:trash"]').click();
          });
  
          cy.contains('button', 'Cancel')
                  .click()
                  .should('not.exist');
          cy.contains('Issue has successfully been deleted').should('not.exist')
          cy.contains('This is an issue of type: Task.').should('exist');
      });
});