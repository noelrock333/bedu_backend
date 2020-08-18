const { exec } = require('child_process');
const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 3002;

// const server = http.createServer((req, res) => {
//   if (req.url === '/consola') {
//     console.log(req.query);
//   }
//   if (req.url === '/tours') {
//     res.end('Hola mundo ' + req.method + ' ' + req.url);
//   } else {
//     res.end('404');
//   }
// });

// server.listen(port, hostname, () => {
//   console.log(`server is in http://${hostname}:${port}`)
// });

const { exec } = require('child_process');
exec('cron -s 20,633 node inde.js', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});