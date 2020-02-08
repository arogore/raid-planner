import * as io from "socket.io-client";
import Drawer from "./drawer";
import config from "../config.default";
import Pickr from "@simonwep/pickr";

export default class Main {

    private drawer: Drawer;

    run() {
        const url = config.url;

        window.onload = () => {
            const socket = io.connect(url);
            this.drawer = new Drawer(socket);
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
            console.log(color);
            console.log(`setting color to ${color.toHEXA().toString()}`);
            this.drawer.color = color.toHEXA().toString();
            instance.hide();
        });
    }
}

new Main().run();
