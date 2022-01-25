import fs from "fs";
import "dotenv/config";
import app from "./app";
import http from "http";
import https from "https";



// Récupération du port dans le .env
const port = process.env.PORT;
app.set('port', port);



const privateKey  = fs.readFileSync('./certificate/server.key', 'utf8');
const certificate = fs.readFileSync('./certificate/server.cert', 'utf8');
const credentials = {key: privateKey, cert: certificate};


// Server HTTPS
const serverHttps = https.createServer(credentials, app);

// Server Http
const serverHttp = http.createServer((req, res) => {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
});



serverHttps.listen(443, () => {
    console.log("Server https is running on port " + 443);
});

serverHttp.listen(port, () => {
    console.log("Server http is running on port " + port);
});