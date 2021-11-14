import app from "./app";
import http from "http";
import "dotenv/config";

// Récupération du port dans le .env
const port = process.env.PORT;
app.set('port', port);


const server = http.createServer(app);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Server listening on ' + bind);
});

server.listen(port);