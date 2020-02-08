import Point from "./models/point";
import Dispatcher from "./dispatcher";
import PointEvent from "./models/point-event";

export default class Drawer {
    private canvasId: string = "main-canvas";
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    public color: string;
    private drawing: boolean;
    private currentLine: Array<Point>;

    constructor(socket: SocketIOClient.Socket, private dispatcher: Dispatcher) {
        this.canvas = this.getCanvas();
        this.context = this.canvas.getContext("2d");
        this.context.lineWidth = 4;
        this.color = "white";
        this.registerEvents();

        const bg = new Image();
        bg.src = "public/img/bwl-1.jpg";

        bg.onload = () => this.canvas.getContext("2d").drawImage(bg, 0, 0);

        socket.on('line-drawn', (payload: any) => {
            this.drawLine(payload.line, false);
        });

        socket.on('point-drawn', (payload: PointEvent) => {
            const oldColor = this.color;
            this.context.strokeStyle = payload.color;
            this.drawFrom(payload.origin, payload.destination, false);
            this.context.strokeStyle = oldColor;
        });
    }

    getCanvas(): HTMLCanvasElement {
        return document.getElementById(this.canvasId) as HTMLCanvasElement;
    }

    drawLine(points: Point[], isOrigin: boolean = true) {
        const firstPoint = points[0];

        this.context.beginPath();
        this.moveTo(firstPoint);

        for (const point of points.slice(1)) {
            this.lineTo(point);
        }

        this.context.stroke();

        if (isOrigin) {
            this.dispatcher.lineDrawn(points);
        }
    }

    drawFrom(origin: Point, destination: Point, isOrigin: boolean = true) {
        if (isOrigin) {
            this.context.strokeStyle = this.color;
        }

        this.context.beginPath();

        this.moveTo(origin);
        this.lineTo(destination);

        this.context.stroke();

        if (isOrigin) {
            this.dispatcher.pointDrawn(new PointEvent(origin, destination, this.color));
        }
    }

    registerEvents() {
        this.canvas.onmousedown = (e) => {
            this.currentLine = [this.constructPoint(e.clientX, e.clientY)];
            this.drawing = true;
        };

        this.canvas.onmousemove = (e) => {
            if (this.drawing) {
                const newPoint = this.constructPoint(e.clientX, e.clientY);
                
                this.drawFrom(this.currentLine[this.currentLine.length - 1], newPoint);
                this.currentLine.push(newPoint);
            }
        };

        this.canvas.onmouseup = () => {
            this.drawing = false;
        };
    }

    moveTo(point: Point) {
        this.context.moveTo(point.X, point.Y);
    }

    lineTo(point: Point) {
        this.context.lineTo(point.X, point.Y);
    }

    constructPoint(x: number, y: number): Point {
        return new Point(x, y, this.canvas);
    }
}
