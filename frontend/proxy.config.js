const proxy = [
  {
    context: '/challengeway',
    target: 'http://localhost:8080',
    pathRewrite: {'^/challengeway' : '/backend'}
  }
];
module.exports = proxy;

