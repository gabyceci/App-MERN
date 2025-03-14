//Importo la libreria que acabo de instalar
import dotenv from "dotenv";

//Ejecuto "Dotenv" que me ayudará a acceder al .env
dotenv.config();

export const config = {
    db: {
        URI: process.env.DB_URI || "mongodb://localhost:27017/ZonaDigitalDB20190019", 
    },
    server: {
        port: process.env.PORT || 4000,
    },
}