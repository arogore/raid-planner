import * as io from "socket.io-client";
import Point from "./models/point";
import Drawer from "./drawer";

const socket = io.connect("http://localhost:23451");

window.onload = () => {
    const drawer = new Drawer(socket);
};

