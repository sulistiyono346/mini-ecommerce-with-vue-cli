var app = require('../app.js')
var chai = require('chai')
var chaiHttp = require('chai-http')
var expect = chai.expect

chai.use(chaiHttp)
var Item = require('../models/items')
var category_id = "5c435e6a0df11a32e41b0b1e"
var category_id_null = "5c435e6a0df11a32e41b0b1k"

var item_id
var item_id_null = "5c435e6a0df11a32e41b0b1h"

describe('item backend testing !!!', () => {
    beforeEach((done) => {
        const obj = {
            title: "barang1",
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

    afterEach((done) => {
        Item.remove({}, () => {
            done()
        })
    })

    // ================================================================== //


    it(' POST /items should send an object of inserted items with 201 status code', function (done) {
        const obj = {
            title: "item example create",
            price: 2000,
            first_stock: 20,
            stock: 20,
            description: "Barang Pertama",
            category: "5c435e6a0df11a32e41b0b1e",
        };
        chai
            .request(app)
            .post('/items')
            .send(obj)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(201);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('first_stock');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('category');
                expect(res.body.title).to.equal(obj.title);
                expect(res.body.price).to.equal(obj.price);
                expect(res.body.first_stock).to.equal(obj.first_stock);
                expect(res.body.stock).to.equal(obj.stock);
                expect(res.body.description).to.equal(obj.description);
                expect(res.body.category).to.equal(obj.category)
                done();
            });
    })
    it('POST /items should return error with status code 400 with key message if value of item is null', function (done) {
        const obj = {
            title: "",
            price: "",
            first_stock: "20",
            stock: 20,
            description: "Barang Pertama",
            category: "5c435e6a0df11a32e41b0b1e",
        };
        chai
            .request(app)
            .post('/items')
            .send(obj)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
    })

    it('GET /items should return all item', function (done) {
        chai
            .request(app)
            .get('/items')
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array')
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('price');
                expect(res.body[0]).to.have.property('first_stock');
                expect(res.body[0]).to.have.property('stock');
                expect(res.body[0]).to.have.property('description');
                expect(res.body[0]).to.have.property('category');
                done();
            });
    })
    it('GET /items/:id should return spesific item', function (done) {
        chai
            .request(app)
            .get(`/items/${item_id}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('_id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('price');
                expect(res.body).to.have.property('first_stock');
                expect(res.body).to.have.property('stock');
                expect(res.body).to.have.property('description');
                expect(res.body).to.have.property('category');
                done();
            });
    })

    it('GET /items/:id with article not define on database should return error with status code 400', function (done) {
        chai
            .request(app)
            .get(`/items/${item_id_null}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
    })
    it('GET /items/category/:id should return spesific item equal with category id', function (done) {
        chai
            .request(app)
            .get(`/items/category/${category_id}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('array')
                expect(res.body[0]).to.have.property('_id');
                expect(res.body[0]).to.have.property('title');
                expect(res.body[0]).to.have.property('price');
                expect(res.body[0]).to.have.property('first_stock');
                expect(res.body[0]).to.have.property('stock');
                expect(res.body[0]).to.have.property('description');
                expect(res.body[0]).to.have.property('category');
                done();
            });
    })
    it('GET /items/category/:id with category not define on database should return error with status code 400', function (done) {
        chai
            .request(app)
            .get(`/items/category/${category_id_null}`)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('message');
                done();
            });
    })

    it('PUT /items should return updated item', function (done) {
        const obj = {
            title: "example item update",
            price: 10000,
            first_stock: 10,
            stock: 20,
            description: "item example upadte",
            category: "5c435e6a0df11a32e41b0b1e",
        };
        chai
            .request(app)
            .put(`/items/${item_id}`)
            .send(obj)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('n');
                expect(res.body).to.have.property('nModified');
                expect(res.body).to.have.property('ok');

                expect(res.body.n).to.equal(1);
                expect(res.body.nModified).to.equal(1);
                expect(res.body.ok).to.equal(1);


                done();
            });
    })

    it('PUT /items  with item not define on database null should return error message with status 400', function (done) {
        const obj = {
            title: "200",
            price: 10000,
            first_stock: 10,
            stock: 20,
            description: "item example upadte",
            category: "5c435e6a0df11a32e41b0b1e",
        };
        chai
            .request(app)
            .put(`/items/${item_id_null}`)
            .send(obj)
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('message');
                expect(res.body.message).to.equal('Cast to ObjectId failed for value "5c435e6a0df11a32e41b0b1h" at path "_id" for model "Item"');
                done();
            });
    })

    it('DELETE /items should return message with status 200', function (done) {
        chai
            .request(app)
            .delete(`/items/${item_id}`)
            .end(function (err, res) {

                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object')
                expect(res.body).to.have.property('n');
                expect(res.body).to.have.property('ok');
                expect(res.body.n).to.equal(1);
                expect(res.body.ok).to.equal(1);
                done();
            });
    })
    it('DELETE /items should return message with status 200', function (done) {
        chai
            .request(app)
            .delete(`/items/${item_id_null}`)
            .end(function (err, res) {
                console.log(err);
                expect(err).to.be.null;
                expect(res).to.have.status(400);
                expect(res.body).to.be.a('object')
                done();
            });
    })
})

