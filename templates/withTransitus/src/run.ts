import { TransitusServer } from "transitus";

function runTransitusServer(){
    const server = new TransitusServer("index.html");
    server.run();
}

runTransitusServer();
