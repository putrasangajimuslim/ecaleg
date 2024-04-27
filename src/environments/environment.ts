export const environment = {
  apiUrl: 'http://103.127.99.172:3000/api/v1/',
  localUrl: 'http://localhost:4200/',
  token: localStorage.getItem('token') || '',
  production: false,
};
