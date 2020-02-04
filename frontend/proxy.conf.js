const PROXI_CONFIG = [
  {
    context: ['/api'],
    target: 'http://localhost:80/challengewidepay/backend',
    secure: false,
    logLevel: 'debug',
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = PROXI_CONFIG;

