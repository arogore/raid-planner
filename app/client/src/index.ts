import * as io from "socket.io-client";
import Drawer from "./drawer";

export default class Main {

    run() {
        const url = "http://arongore.com/planner";
        console.log(`Connecting to ${url}.`);
        const socket = io.connect(url, {
            path: '/planner/socket.io'
        });

        window.onload = () => {
            const drawer = new Drawer(socket);
        };
    }
}

new Main().run();