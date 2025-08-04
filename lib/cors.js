export function applyCORS(response) {
  response.headers.set('Access-Control-Allow-Origin', 'https://airbnb-clone-kappa-topaz.vercel.app');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}