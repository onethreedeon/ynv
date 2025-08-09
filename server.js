const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const baseDir = process.cwd();
const port = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(baseDir, reqPath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Serving ${baseDir} at http://localhost:${port}`);
});
