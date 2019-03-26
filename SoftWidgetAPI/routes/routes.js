const orders = require('../app/orders'),
  products = require('../app/products');

const ordersApiRoutes = [
  {
    method: 'POST',
    url: '/api/createorder',
    handler: orders.createOrder
  },
  {
    method: 'GET',
    url: '/api/getorder/:id',
    handler: orders.getOrder
  },
  {
    method: 'PUT',
    url: '/api/updateorder/:id',
    handler: orders.updateOrder
  },
  {
    method: 'DELETE',
    url: '/api/deleteorder/:id',
    handler: orders.deleteOrder
  }
];

const productsApiRoutes = [
  {
    method: 'GET',
    url: '/api/getproducts',
    handler: products.getProducts
  }
];

exports.apiRoutes = [ordersApiRoutes, productsApiRoutes];
