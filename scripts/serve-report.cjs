const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const reportPath = path.resolve(__dirname, "..", "reports", "newman-report.html");

http
  .createServer((request, response) => {
    if (request.url !== "/" && request.url !== "/newman-report.html") {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("Not found");
      return;
    }

    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(reportPath).pipe(response);
  })
  .listen(8765, "127.0.0.1", () => {
    console.log("Report available at http://127.0.0.1:8765");
  });

