import * as io from "socket.io-client";
import Drawer from "./drawer";
import config from "../config.default";

export default class Main {

    run() {
        const url = config.url;

        window.onload = () => {
            const socket = io.connect(url);
            const drawer = new Drawer(socket);
        };
    }
}

new Main().run();
