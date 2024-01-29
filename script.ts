interface Shape {
    readonly name: string;
    size: number;
    backgroundColor: string;
    isSquare: boolean;
    diameter?: number;
    length?: number;
  }
  
  class Circle implements Shape {
    readonly name: string;
    diameter: number;
    backgroundColor: string;
    
    constructor(diameter: number, backgroundColor: string) {
      this.name = this.generateName();
      this.diameter = diameter;
      this.backgroundColor = backgroundColor;
    }
    
    private generateName(): string {
      const index = Object.values(shapesMap).filter((shape) => shape instanceof Circle).length + 1;
      return `circle_${index}`;
    }
    
    get size(): number {
      return this.diameter;
    }
    
    set size(size: number) {
      this.diameter = size;
    }
    
    get isSquare(): boolean {
      return false;
    }
  }
  
  class Square implements Shape {
    readonly name: string;
    length: number;
    backgroundColor: string;
    
    constructor(length: number, backgroundColor: string) {
      this.name = this.generateName();
      this.length = length;
      this.backgroundColor = backgroundColor;
    }
    
    private generateName(): string {
      const index = Object.values(shapesMap).filter((shape) => shape instanceof Square).length + 1;
      return `square_${index}`;
    }
    
    get size(): number {
      return this.length;
    }
    
    set size(size: number) {
      this.length = size;
    }
    
    get isSquare(): boolean {
      return true;
    }
  }
  
  const shapesMap: Record<string, Shape> = {};
  
  function createCircle(diameter: number, backgroundColor: string): Circle {
    const circle = new Circle(diameter, backgroundColor);
    shapesMap[circle.name] = circle;
    return circle;
  }
  
  function createSquare(length: number, backgroundColor: string): Square {
    const square = new Square(length, backgroundColor);
    shapesMap[square.name] = square;
    return square;
  }