const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3003;

// req = request; peticion;
// res = response; respuesta;

const server = http.createServer((req, res) => {
  // console.log(req)
  // console.log(req.method)
  // console.log(req.url)
  if (req.url === '/tours') {
    res.setHeader('Content-type', 'text/html')
    const miArchivo = fs.readFileSync('./index.html', 'utf-8');
    res.write(miArchivo);
  } else {
    res.end('404');
  }
  // res.end(`Hola mundo ${req.method} ${req.url}`);
});

server.listen(port, hostname, () => {
  console.log(`server is in http://${hostname}:${port}`)
});

// const saluda = require('./saluda');

// saluda('Noel Escobedo');
