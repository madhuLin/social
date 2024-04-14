import http from 'http';
import fs from 'fs';
import path from 'path';

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const hostname = '0.0.0.0';
const port = 3000;

const server = http.createServer((req, res) => {
  // 处理根路径请求
  if (req.url === '/') {
    fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
  // 处理请求main.js文件的情况
  else if (req.url === '/src/main.js') {
    fs.readFile(path.join(__dirname, 'src', 'main.js'), (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading main.js');
      }
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.end(data);
    });
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
