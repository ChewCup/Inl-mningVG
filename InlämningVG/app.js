
/* Includes: */
var http = require('http');
var fs = require("fs");
var url = require("url");
function calcPage(res) {
    fs.readFile("jscalc.html", function (err, html) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        return res.end();
    });
}
function computePage(adr, res) {
    var q = url.parse(adr, true);
    var X = q.query.x * 1, Y = q.query.y * 1, result;
    res.write("<html>");
    res.write("<head>");
    res.write("<title>" + "Random" + q.search + "</title>");
    res.write("</head>");
    res.write("<body>");
    if (q.query.op == "plus") {
        result = X + Y;
        sign = "+";
    }
    if (q.query.op == "minus") {
        result = X - Y;
        sign = "-";
    }
    if (q.query.op == "times") {
        result = X * Y;
        sign = "*";
    }
    if (q.query.op == "div") {
        result = X / Y;
        sign = "/";
    }
    var expression = q.query.x + " " + sign + " " + q.query.y + " = " + result;
    res.write("<h1>" + expression + "</h1>");
    res.write("</body>");
    res.write("</html");
    res.end();
}
function mainPage(res) {
    fs.readFile("calc.html", function (err, html) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        return res.end();
    });
}
/* Register server: */
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    console.log("Serving " + req.url);
    var p = url.parse(req.url, true);
    if (req.url == "/") {
        mainPage(res);
    }
    else if (req.url == "/calc") {
        calcPage(res);
    }
    else if (p.pathname == "/compute") {
        computePage(req.url, res);
    }
    else {
        res.write("404")
        return res.end();
    }
}).listen(8080);