describe('Test game a tetris',()=>{

    // in this array contains the moviments to game.
    const  commands = ['{upArrow}','{downArrow}','{leftArrow}','{rightArrow}']

    it('should read the controls, put a difficult in the easy, start game, pause, resume, press any button and back to menu initial',() => {
        cy.visit('/')
        // access the game url

        cy.get('[data-cy=btnControls]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBackMenu]').click()
        // query the commands game and back to main menu

        cy.get('[data-cy=btnDifficult]').click()
        cy.wait(400)
        cy.get('[data-cy=btnEasy]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.wait(600)
        // select the difficult game and start

        cy.get('[data-cy=btnPause]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBack]').click()
        // take pause and return to game

        for(let i=0;i<=100;i++){
            cy.get('body').type(commands[parseInt(Math.random()*4)])
            cy.wait(400)
        }
        //  execute the aleatory commands as move right and left, change the positions and move down
        
        cy.wait(65000)
        cy.get('[data-cy=btnBackMenuInitial]').click()
        // wait the game over and back to main menu

    })


    it('should read the controls, put a difficult in the medium, start game, pause, resume, press any button and back to menu initial',() => {
        cy.visit('/')
        // access the game url

        cy.get('[data-cy=btnControls]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBackMenu]').click()
        // query the commands game and back to main menu

        cy.get('[data-cy=btnDifficult]').click()
        cy.wait(400)
        cy.get('[data-cy=btnMedium]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.wait(600)
        // select the difficult game and start

        cy.get('[data-cy=btnPause]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBack]').click()
        // take pause and return to game

        for(let i=0;i<=100;i++){
            cy.get('body').type(commands[parseInt(Math.random()*4)])
            cy.wait(300)
        }
        //  execute the aleatory commands as move right and left, change the positions and move down

        cy.wait(50000)
        cy.get('[data-cy=btnBackMenuInitial]').click()


    })

    it('should read the controls, put a difficult in the hard, start game, pause, resume, press any button and back to menu initial',() => {
        cy.visit('/')
        

        cy.get('[data-cy=btnControls]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBackMenu]').click()
        // query the commands game and back to main menu

        cy.get('[data-cy=btnDifficult]').click()
        cy.wait(400)
        cy.get('[data-cy=btnHard]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.wait(600)
        // select the difficult game and start

        cy.get('[data-cy=btnPause]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBack]').click()
        // take pause and return to game

        for(let i=0;i<=100;i++){
            cy.get('body').type(commands[parseInt(Math.random()*4)])
            cy.wait(400)
        }
        //  execute the aleatory commands as move right and left, change the positions and move down

        cy.wait(30000)
        cy.get('[data-cy=btnBackMenuInitial]').click()


    })

    it('should read the controls, put a difficult in the extreme, start game, pause, resume,press any button and back to menu initial',() => {
        cy.visit('/')


        cy.get('[data-cy=btnControls]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBackMenu]').click()
        // query the commands game and back to main menu

        cy.get('[data-cy=btnDifficult]').click()
        cy.wait(400)
        cy.get('[data-cy=btnExtreme]').click()
        cy.get('[data-cy=btnStart]').click()
        cy.wait(600)
        // select the difficult game and start

        cy.get('[data-cy=btnPause]').click()
        cy.wait(600)
        cy.get('[data-cy=btnBack]').click()
        // take pause and return to game

        for(let i=0;i<=100;i++){
            cy.get('body').type(commands[parseInt(Math.random()*4)])
            cy.wait(200)
        }
        //  execute the aleatory commands as move right and left, change the positions and move down

        cy.wait(15000)
        cy.get('[data-cy=btnBackMenuInitial]').click()
        // wait the game over and back to main menu

    })
        
    
    //finished test

    

})