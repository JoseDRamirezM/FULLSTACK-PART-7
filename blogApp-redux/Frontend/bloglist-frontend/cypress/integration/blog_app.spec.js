describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.get('html').should('contain', 'username')
    cy.get('html').should('contain', 'password')
    cy.get('html').should('contain', 'login')
  })

  describe('Login', function () {
    beforeEach( function () {
      const user = {
        name: 'Jose',
        username: 'test',
        password: 'password'
      }
      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000')
    })
    it('user can log in', function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('password')
      cy.get('#login-button').click()
      cy.contains('Jose logged')
    })

    it('login fails with wrong password', function() {
      cy.contains('login').click()
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('#notification')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 255, 255)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'Jose logged')
    })

    describe('when logged in', function(){
      beforeEach(function() {
        cy.login({ username: 'test', password: 'password' })
      })

      it('new blog can be created', function () {
        cy.contains('create new blog').click()
        cy.get('.title').type('test Blog cypress')
        cy.get('.author').type('Test')
        cy.get('.url').type('test url')
        cy.get('#create-button').click()
        cy.contains('test Blog cypress')
      })

      describe('blog exists', function() {
        beforeEach(function () {
          cy.createBlog({
            title: 'another note cypress',
            author: 'test',
            url: 'test url'
          })
        })
        it('blog exists', function () {
          cy.contains('another note cypress')
        })
        it('user can like a blog', function() {
          cy
            .contains('another note cypress')
            .contains('view').click()
          cy.get('.likes').then(() => {
            cy.get('.likeButton').click()
          })
          cy.get('.likes').should('contain', 'likes 1')

        })
        it('blog creator can remove it ', function () {
          cy.contains('another note cypress')
            .contains('view').click()
          cy.get('.remove-button').should('have.css', 'color', 'rgb(255, 255, 255)').click()
          cy.get('#notification')
            .should('contain', 'removed')
            .and('have.css', 'color', 'rgb(255, 255, 255)')
            .and('have.css', 'border-style', 'solid')
          cy.get('html').should('not.contain', 'another note cypress')
        })
        describe('other users can not remove blogs', function () {
          beforeEach(function () {
            const user = {
              name: 'otherUser',
              username: 'otherUser',
              password: 'password'
            }
            cy.request('POST', 'http://localhost:3001/api/users/', user)
            cy.login({ username: 'otherUser', password: 'password' })
          })
          it('remove button is not visible', function () {
            cy.contains('another note cypress')
              .contains('view').click()
            cy.get('.remove-button').should('have.css', 'display', 'none')
          })
        })

        describe('blogs are sorted by number of likes', function() {
          it('create blogs and press like button', function(){
            //create 2 new blogs
            cy.createBlog({
              title: 'test1',
              author: 'test',
              url: 'test url'
            })
            cy.createBlog({
              title: 'test2',
              author: 'test',
              url: 'test url'
            })
            //confirm the blogs are displayed
            cy.get('html').should('contain', 'test1')
            cy.get('html').should('contain', 'test2')

            //Like each blog x times
            cy.contains('another note cypress')
              .contains('view').click()
            for (let x=0; x < 6; x++) {
              cy.get('.details')
                .contains('another note cypress').contains('like').click()
              cy.get('.details')
                .contains('another note cypress')
                .should('not.contain', `likes ${x - 1}`)
            }
            cy.get('.details').contains('another note cypress')
              .contains('hide').click()

            cy.contains('test1')
              .contains('view').click()
            for (let x=0; x < 8; x++) {
              cy.get('.details')
                .contains('test1').contains('like').click()
              cy.get('.details')
                .contains('test1')
                .should('not.contain', `likes ${x - 1}`)
            }
            cy.get('.details').contains('test1')
              .contains('hide').click()

            cy.contains('test2')
              .contains('view').click()
            for (let x=0; x < 10; x++) {
              cy.get('.details')
                .contains('test2').contains('like').click()
              cy.get('.details')
                .contains('test2')
                .should('not.contain', `likes ${x - 1}`)
            }
            cy.get('.details').contains('test2')
              .contains('hide').click()

            //make sure they're in the correct order according to the number of likes
            cy.get('.blog-list').children().eq(0).should('contain', 'test2')
            cy.get('.blog-list').children().eq(1).should('contain', 'test1')
            cy.get('.blog-list').children().eq(2).should('contain', 'another note')
            //blogs are sorted!
          })
        })
      })
    })
  })
})




