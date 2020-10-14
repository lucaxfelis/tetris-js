describe('Test game a tetris',()=>{

    it('should read the controls, put a difficult in the easy, start game, pause, resume and back to menu initial',() => {
        cy.visit('/')
        cy.get('[data-cy=btnControls]').click()
        cy.get('[data-cy=btnBackMenu]').click()
        cy.get('[data-cy=btnDifficult]').click()
        cy.get('[data-cy=btnEasy]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.get('[data-cy=btnPause]').click()
        cy.get('[data-cy=btnBack]').click()
        cy.wait(70000)
        cy.get('[data-cy=btnBackMenuInitial]').click()
    })

    it('should read the controls, put a difficult in the medium, start game, pause, resume and back to menu initial',() => {
        cy.visit('/')
        cy.get('[data-cy=btnControls]').click()
        cy.get('[data-cy=btnBackMenu]').click()
        cy.get('[data-cy=btnDifficult]').click()
        cy.get('[data-cy=btnMedium]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.get('[data-cy=btnPause]').click()
        cy.get('[data-cy=btnBack]').click()
        cy.wait(60000)
        cy.get('[data-cy=btnBackMenuInitial]').click()

    })

    it('should read the controls, put a difficult in the hard, start game, pause, resume and back to menu initial',() => {
        cy.visit('/')
        cy.get('[data-cy=btnControls]').click()
        cy.get('[data-cy=btnBackMenu]').click()
        cy.get('[data-cy=btnDifficult]').click()
        cy.get('[data-cy=btnHard]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.get('[data-cy=btnPause]').click()
        cy.get('[data-cy=btnBack]').click()
        cy.wait(40000)
        cy.get('[data-cy=btnBackMenuInitial]').click()

    })

    it('should read the controls, put a difficult in the extreme, start game, pause, resume and back to menu initial',() => {
        cy.visit('/')
        cy.get('[data-cy=btnControls]').click()
        cy.get('[data-cy=btnBackMenu]').click()
        cy.get('[data-cy=btnDifficult]').click()
        cy.get('[data-cy=btnExtreme]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.get('[data-cy=btnPause]').click()
        cy.get('[data-cy=btnBack]').click()
        cy.wait(25000)
        cy.get('[data-cy=btnBackMenuInitial]').click()

    })


    

})