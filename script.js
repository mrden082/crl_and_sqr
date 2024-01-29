"use strict";
class Circle {
    constructor(diameter, backgroundColor) {
        this.name = this.generateName();
        this.diameter = diameter;
        this.backgroundColor = backgroundColor;
    }
    generateName() {
        const index = Object.values(shapesMap).filter((shape) => shape instanceof Circle).length + 1;
        return `circle_${index}`;
    }
    get size() {
        return this.diameter;
    }
    set size(size) {
        this.diameter = size;
    }
    get isSquare() {
        return false;
    }
}
class Square {
    constructor(length, backgroundColor) {
        this.name = this.generateName();
        this.length = length;
        this.backgroundColor = backgroundColor;
    }
    generateName() {
        const index = Object.values(shapesMap).filter((shape) => shape instanceof Square).length + 1;
        return `square_${index}`;
    }
    get size() {
        return this.length;
    }
    set size(size) {
        this.length = size;
    }
    get isSquare() {
        return true;
    }
}
const shapesMap = {};
function createCircle(diameter, backgroundColor) {
    const circle = new Circle(diameter, backgroundColor);
    shapesMap[circle.name] = circle;
    return circle;
}
function createSquare(length, backgroundColor) {
    const square = new Square(length, backgroundColor);
    shapesMap[square.name] = square;
    return square;
}
