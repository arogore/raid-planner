import * as io from "socket.io-client";
import Drawer from "./drawer";

export default class Main {

    run() {
        const socket = io.connect("http://arongore.com/planner", {
            path: 'planner'
        });

        window.onload = () => {
            const drawer = new Drawer(socket);
        };
    }
}

new Main().run();