var app = require('../app.js')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect
var User = require('../models/users')

chai.use(chaiHttp)

describe('Users Register', () => {
    beforeEach((done) => {
        let obj = {
            name: 'user',
            email: 'userexist@mail.com',
            password: '12345'
        }
        var user = new User(obj)

        user.save(function (err, newUser) {
            if (err) {
                console.log('before each error', err.message)
            } else {
                done()
            }
        });

    })

    afterEach((done) => {
        User.remove({}, () => {
            done()
        })
    })
    it('POST /register should return new registered user', (done) => {
        let obj = {
            name: 'user',
            email: 'user@mail.com',
            password: '12345'
        }

        chai.request(app)
            .post('/register')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(201)
                expect(res.body).to.be.a('object')
                expect(res.body.result).to.have.property('name')
                expect(res.body.result).to.have.property('email')
                expect(res.body.result).to.have.property('password')

                expect(res.body.result.username).to.equal(obj.username)
                expect(res.body.result.email).to.equal(obj.email)
                expect(res.body.result.password).to.not.equal(obj.password)

                done()
            })
    })
    it('POST /register with should return error if name is blank', (done) => {
        let obj = {
            name: "",
            email: 'user@mail.com',
            password: '12345'
        }
        chai.request(app)
            .post('/register')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.a('object')
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal("User validation failed: name: name can't be blank")
                done()
            })
    })
    it('POST /register with should return error if email is blank', (done) => {
        let obj = {
            name: 'user',
            email: '',
            password: '12345'
        }
        chai.request(app)
            .post('/register')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.a('object')
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal("User validation failed: email: email can't be blank")
                done()
            })
    })
    it('POST /register with should return error if password is blank', (done) => {
        let obj = {
            name: 'user',
            email: 'user@mail.com',
            password: ''
        }
        chai.request(app)
            .post('/register')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.a('object')
                expect(res).to.have.status(400)
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal("User validation failed: password: password can't be blank")
                done()
            })
    })
    it('POST /register with should return error if email already exist', (done) => {

        let obj = {
            name: 'user',
            email: 'userexist@mail.com',
            password: '12345'
        }
        chai.request(app)
            .post('/register')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.a('object')
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal('User validation failed: email: email already exist')
                done()
            })
    })
    it('POST /register with should return error if password length lest than 5', (done) => {

        let obj = {
            name: 'user',
            email: 'user@mail.com',
            password: '1234'
        }
        chai.request(app)
            .post('/register')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.body).to.be.a('object')
                expect(res).to.have.status(400)
                expect(res.body.message).to.equal('User validation failed: password: minimum length of password 5 caracter')
                done()
            })
    })
})

describe('Users Login', () => {
    beforeEach((done) => {
        let obj = {
            name: 'user',
            email: 'user@mail.com',
            password: '12345'
        }
        var user = new User(obj)

        user.save(function (err, newUser) {
            if (err) {
                console.log('before each error', err.message)
            } else {
                done()
            }
        });

    })

    afterEach((done) => {
        User.remove({}, () => {
            done()
        })
    })

    it('POST /login should success with token ', (done) => {
        let obj = {
            email: 'user@mail.com',
            password: '12345'
        }

        chai.request(app)
            .post('/login')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('access_token');
                done()
            })
    })
    it('POST /login should return error message if password not equal ', (done) => {
        let obj = {
            email: 'user@mail.com',
            password: '1234'
        }
        chai.request(app)
            .post('/login')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body.message).to.equal('wrong password/email please try again')
                done()
            })
    })
    it('POST /login should return error message if email not equal', (done) => {
        let obj = {
            email: 'user@mail.cm',
            password: '12345'
        }
        chai.request(app)
            .post('/login')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body.message).to.equal('wrong password/email please try again')
                done()
            })
    })
    it('POST /login should return error message if email null', (done) => {
        let obj = {
            email: '',
            password: '12345'
        }
        chai.request(app)
            .post('/login')
            .send(obj)
            .end((err, res) => {
                console.log(err);

                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body.message).to.equal('wrong password/email please try again')
                done()
            })
    })
    it('POST /login should return error message if password null', (done) => {
        let obj = {
            email: 'user@mail.com',
            password: ''
        }
        chai.request(app)
            .post('/login')
            .send(obj)
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(400)
                expect(res.body).to.be.a('object')
                expect(res.body.message).to.equal('wrong password/email please try again')
                done()
            })
    })
})