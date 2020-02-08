import Point from "./point";

export default class PointEvent {
    constructor(public origin: Point, public destination: Point, public color: string) {}
}