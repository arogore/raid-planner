export default class Point {
    public X: number;
    public Y: number;

    constructor(x: number, y: number, canvas: HTMLCanvasElement) {
        const boundingBox = canvas.getBoundingClientRect();
        this.X = Math.floor(x - boundingBox.left * (canvas.width / boundingBox.width));
        this.Y = Math.floor(y - boundingBox.top * (canvas.height / boundingBox.height));
    }
}