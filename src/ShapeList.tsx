import React from 'react';

interface Shape {
  name: string;
  size: number;
  backgroundColor: string;
  isSquare: boolean;
  diameter?: number;
  length?: number;
  xPos?: number;
  yPos?: number;
}

interface ShapeListProps {
  shapes: Shape[];
  setShapePosition: (name: string, xPos: number, yPos: number) => void;
}

const ShapeList: React.FC<ShapeListProps> = ({ shapes, setShapePosition }) => {
  const handleSetPosition = (name: string, xPos: number, yPos: number): void => {
    setShapePosition(name, xPos, yPos);
  };

  return (
    <div>
      <h2>Shapes List</h2>
      {shapes.map((shape, index) => (
        <div
          key={shape.name}
          style={{
            width: shape.size,
            height: shape.size,
            backgroundColor: shape.backgroundColor,
            borderRadius: shape.isSquare ? '0%' : '50%',
            margin: '0.5rem',
            position: 'absolute',
            left: shape.xPos,
            top: shape.yPos,
          }}
          data-index={index}
          onMouseDown={() => handleSetPosition(shape.name, shape.xPos || 0, shape.yPos || 0)}
        ></div>
      ))}
    </div>
  );
};

export default ShapeList;
