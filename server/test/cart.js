var app = require('../app.js')
var chai = require('chai')
var chaiHttp = require('chai-http')

var expect = chai.expect

chai.use(chaiHttp)
var Cart = require('../models/cart')
var Item = require('../models/items')
var User = require('../models/users')
var Cart = require('../models/cart')
var { create_token } = require('../helpers/token')


// variabel global
var item_id
var category_id = "5c435e6a0df11a32e41b0b1e"
var token
var user_id
var id_null = "5c435e6a0df11a32e41b0b1h"
var token_null = "5c435e6a0df11a32e41b0b1h"
// end


describe('Cart', () => {

    beforeEach((done) => {
        const obj = {
            title: "item testing",
            price: 2000,
            first_stock: 20,
            stock: 20,
            description: "Barang Pertama",
            category: `${category_id}`,
        };
        Item.create(obj)
            .then((result) => {
                item_id = String(result._id)
                done()
            })
    })

    beforeEach((done) => {
        let obj = {
            name: 'user',
            email: 'user@mail.com',
            password: '12345'
        }
        User.create(obj)
            .then((tes) => {
                User.findOne({ _id: tes._id })
                    .then((result) => {
                        let obj_user = {
                            id: result._id,
                            email: result.email
                        }
                        token = create_token(obj_user)
                        user_id = String(obj_user.id)
                        done()
                    })
            })
    })

    afterEach((done) => {
        Item.remove({}, () => {
            User.remove({}, () => {
                Cart.remove({}, () => {
                    done()
                })
            })
        })
    })



    it(' POST /transactions/cart should send an object of inserted cart with 201 status code', function (done) {
        const obj = {
            item_id: item_id,
            total_item: 2
        };
        chai
            .request(app)
            .post('/transactions/cart')
            .send(obj)
            .set('token', token)
            .end(function (err, res) {
                
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body.result).to.be.an('object');
                expect(res.body.result).to.have.property('_id');
                expect(res.body.result).to.have.property('user_id');
                expect(res.body.result).to.have.property('item_id');
                expect(res.body.result).to.have.property('total_item');
                expect(res.body.result.item_id).to.equal(obj.item_id);
                expect(res.body.result.total_item).to.equal(obj.total_item);
                done();
            });
    })
    it(' GET /transactions/cart should send an object of all item user cart with 200 status code', function (done) {
        const obj = {
            item_id: item_id,
            total_item: 2,
            user_id: user_id
        };

        Cart.create(obj)
            .then((result) => {
            }).catch((err) => {
            });

        chai
            .request(app)
            .get('/transactions/cart')
            .set('token', token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('user_id');
                expect(res.body[0]).to.have.property('item_id');
                expect(res.body[0]).to.have.property('total_item');
                done();
            });
    })
    it(' GET /transactions/cart should send an object  with 200 status code', function (done) {
        const obj = {
            item_id: item_id,
            total_item: 2,
            user_id: id_null
        };

        Cart.create(obj)
            .then((result) => {
            }).catch((err) => {
            });

        chai
            .request(app)
            .get('/transactions/cart')
            .set('token', token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    })
    it(' GET /transactions/cart should with id not registered send an object of all item user cart with 400 status code', function (done) {
        const obj = {
            item_id: item_id,
            total_item: 2,
            user_id: user_id
        };

        Cart.create(obj)
            .then((result) => {
            }).catch((err) => {
            });

        chai
            .request(app)
            .get('/transactions/cart')
            .set('token', token_null)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('forbidden access to this resource on the server is denied');
                done();
            });
    })
    it(' DELETE /transactions/cart by id should send success with 200 status code', function (done) {
        const obj = {
            item_id: item_id,
            total_item: 2,
            user_id: user_id
        };

        Cart.create(obj)
            .then((result) => {
            }).catch((err) => {
            });

        chai
            .request(app)
            .delete(`/transactions/cart/${item_id}`)
            .set('token', token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body.err).to.have.property('message');
                done();
            });
    })
    it(' DELETE /transactions/cart by id_not registered should send success with 400 status code', function (done) {
        const obj = {
            item_id: item_id,
            total_item: 2,
            user_id: user_id
        };

        Cart.create(obj)
            .then((result) => {
            }).catch((err) => {
            });

        chai
            .request(app)
            .delete(`/transactions/cart/${id_null}`)
            .set('token', token)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body.err).to.have.property('message');
                expect(res.body.err).to.have.property('name');
                expect(res.body.err.name).to.equal('CastError');

                done();
            });
    })

})