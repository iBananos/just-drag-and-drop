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


// Server Http
const serverHttp = http.createServer(app);
serverHttp.on('listening', () => {
    const address = serverHttp.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Server listening on ' + bind);
});


// Server HTTPS
const serverHttps = https.createServer(credentials, app);



serverHttp.listen(port);
serverHttps.listen(443);