import * as io from "socket.io-client";
import Drawer from "./drawer";

const socket = io.connect("http://arongore.com/planner");

window.onload = () => {
    const drawer = new Drawer(socket);
};

