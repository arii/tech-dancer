const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Mock Server OK\n');
});

server.listen(3001, () => {
  console.log('Mock server listening on port 3001');
});
