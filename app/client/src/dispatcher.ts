import Point from "./models/point";
import PointEvent from "./models/point-event";

export default class Dispatcher {

    constructor(private socket: SocketIOClient.Socket) { 
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

    joinRoom(id: string) {
        this.socket.emit('join-room', id);
    }
}

enum CanvasEvent {
    LineDrawn = "line-drawn",
    PointDrawn = "point-drawn"
}