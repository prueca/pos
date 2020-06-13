import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();
const API_URL = process.env.API_URL || 'https://floating-dawn-32865.herokuapp.com';

export default function(req, res, next) {
  proxy.web(req, res, {
    target: API_URL
  });
};
