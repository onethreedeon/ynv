const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const baseDir = process.cwd();
const port = process.env.PORT || 8080;

function includePartials(content) {
  const includePattern = /<!--#include\s+virtual="([^"]+)"\s*-->/g;
  return content.replace(includePattern, (match, includePath) => {
    try {
      const includeFullPath = path.join(baseDir, includePath);
      return fs.readFileSync(includeFullPath, 'utf8');
    } catch {
      return '';
    }
  });
}

const server = http.createServer((req, res) => {
  const reqPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(baseDir, reqPath);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
      return;
    }
    let content = data;
    if (path.extname(filePath) === '.html') {
      content = includePartials(content);
    }
    res.writeHead(200);
    res.end(content);
  });
});

server.listen(port, () => {
  console.log(`Serving ${baseDir} at http://localhost:${port}`);
});
