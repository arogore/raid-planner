import Point from "./models/point";
import PointEvent from "./models/point-event";

export default class Dispatcher {

    constructor(private socket: SocketIOClient.Socket, private room: string) { 
    }

    lineDrawn(line: Point[]) {
        const out = {
            "line": line
        };

        this.socket.emit(CanvasEvent.LineDrawn, out);
    }

    pointDrawn(point: PointEvent) {
        const out = {
            "point": point
        };

        this.socket.emit(CanvasEvent.PointDrawn, point);
    }
}

enum CanvasEvent {
    LineDrawn = "line-drawn",
    PointDrawn = "point-drawn"
}