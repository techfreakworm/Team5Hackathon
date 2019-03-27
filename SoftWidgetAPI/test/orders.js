//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Order = require('../app/orders/order');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Orders', () => {
  beforeEach((done) => { //Before each test we empty the database
    Order.remove({}, (err) => { 
     done();           
   });        
  });

  /*
  * Test the /GET route
  */
  describe('/GET order', () => {
    it('it should GET all the orders', (done) => {
      chai.request(server)
      .get('/orders')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  describe('/POST order', () => {
    it('it should POST an order', (done) => {
      let order = {
        productName: "SWGen2dx",
        shippingAddress: {
          address: "#121 Test Apartment",
          city: "Ghaziabad",
          state: "UP"
        },
        shippingMethod: "free|premium",
        quantity: "2",
        customer: {
          firstName: "Kumar",
          lastName: "Navneet",
          email: "kumar.navneet@cygrp.com",
          phoneNumber: "9444203020"
        }
      }
      chai.request(server)
      .post('/orders')
      .send(order)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                res.body.should.have.property('state').eql('pending');
                res.body.should.have.property('message').eql('Order Created Successfully!');
                done();
              });
    });
  });

  describe('/PUT order', () => {
    it('it should modify an order', (done) => {
      let order = new Order({
        productName: "SWGen2dx",
        shippingAddress: {
          address: "#121 Test Apartment",
          city: "Ghaziabad",
          state: "UP"
        },
        shippingMethod: "free|premium",
        quantity: 1,
        customer: {
          firstName: "Kumar",
          lastName: "Navneet",
          email: "kumar.navneet@cygrp.com",
          phoneNumber: "9444203020"
        }
      })
      order.save((err,order) => {
        chai.request(server)
        .put('/order/' + order.id)
        .send({quantity: 2})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('quantity').eql(2);
          done();
        });
      });
    });
  });

  describe('/DELETE order', () => {
    it('it should delete an order', (done) => {
      let order = new Order({
        productName: "SWGen2dx",
        shippingAddress: {
          address: "#121 Test Apartment",
          city: "Ghaziabad",
          state: "UP"
        },
        shippingMethod: "free",
        quantity: 1,
        customer: {
          firstName: "Kumar",
          lastName: "Navneet",
          email: "kumar.navneet@cygrp.com",
          phoneNumber: "9444203020"
        }
      })
      order.save((err,order) => {
        chai.request(server)
        .delete('/order/' + order.id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('message').eql('Order Deleted Successfully!');
          done();
        });
      });
    });
  });
});