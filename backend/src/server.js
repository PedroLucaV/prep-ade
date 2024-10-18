import app from "./app.js";
import conn from './config/conn.js';

const PORT = 8080;

conn.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log("[APP] Servidor rodando na porta " + PORT);
    });
}).catch((error) => {
    console.error("[APP] Error: " + error);
});