import * as io from "socket.io-client";
import Drawer from "./drawer";
import LobbyManager from "./lobby-manager";
import Dispatcher from "./dispatcher";
import Pickr from "@simonwep/pickr";

export default class Main {

    private drawer: Drawer;
    private lobbyManager: LobbyManager;

    run() {
        const url = "http://127.0.0.1";

        window.onload = () => {
            const socket = io.connect(url, { path: '/planner/socket.io/' });
            const dispatcher = new Dispatcher(socket);
            this.lobbyManager = new LobbyManager(dispatcher);
            this.drawer = new Drawer(socket, dispatcher);

            const currUrl = new URL(window.location.href);
            const room = currUrl.searchParams.get('room');

            if (room) {
                dispatcher.joinRoom(room);
            }

            this.createElements();
        };
    }

    createElements() {
        const pickr = Pickr.create({
            el: ".color-picker",
            theme: "classic",

            swatches: [
                'rgba(0, 0, 0, 1)',
                'rgba(255, 255, 255, 1)',
                'rgba(255, 0, 0, 1)',
                'rgba(12, 0, 255, 1)',
                'rgba(156, 0, 255, 1)',
                'rgba(16, 255, 0, 1)',
                'rgba(255, 124, 0, 1)'
            ],

            components: {

                // Main components
                preview: true,
                opacity: true,
                hue: true,

                // Input / output Options
                interaction: {
                    rgba: true,
                    input: true,
                    clear: true,
                    save: true
                }
            }
        }).on('save', (color: any, instance: any) => {
            this.drawer.color = color.toHEXA().toString();
            instance.hide();
        });
    }
}

new Main().run();
