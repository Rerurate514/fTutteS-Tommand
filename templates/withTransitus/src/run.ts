import { TransitusServer, DefaultRequestHandler } from "transitus";

function runTransitusServer(){
    const server = new TransitusServer([
        new DefaultRequestHandler("index.html")
    ]);

    server.run();
}

runTransitusServer();
