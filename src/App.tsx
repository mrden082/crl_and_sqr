import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import ShapeList from "./ShapeList";
import {
  saveToLocalStorage,
  getFromLocalStorage,
  clearLocalStorage,
} from "./localStorage";
import "./App.css";

interface Shape {
  readonly name: string;
  size: number;
  backgroundColor: string;
  readonly isSquare: boolean;
  diameter?: number;
  length?: number;
  xPos?: number;
  yPos?: number;
}

const App: React.FC = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [shapeType, setShapeType] = useState<string>("");
  const [shapeSize, setShapeSize] = useState<number>(0);
  const [shapeColor, setShapeColor] = useState<string>("");
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const storedShapes = getFromLocalStorage("shapes");
    if (storedShapes) {
      setShapes(storedShapes);
    }
  }, []);

  const handleOpenModal = (type: string) => {
    setShapeType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddShape = (): void => {
    const shape: Shape = {
      name: generateName(),
      size: shapeSize,
      backgroundColor: shapeColor,
      isSquare: shapeType === "square",
      diameter: shapeType === "circle" ? shapeSize : undefined,
      length: shapeType === "square" ? shapeSize : undefined,
      xPos: 0,
      yPos: 0,
    };

    const updatedShapes = [...shapes, shape];
    setShapes(updatedShapes);
    saveToLocalStorage("shapes", updatedShapes);
    handleCloseModal();
  };

  const clearShapes = (): void => {
    setShapes([]);
    clearLocalStorage("shapes");
  };

  const handleSetShapePosition = (
    name: string,
    xPos: number,
    yPos: number
  ): void => {
    const updatedShapes = shapes.map((shape) =>
      shape.name === name ? { ...shape, xPos, yPos } : shape
    );

    setShapes(updatedShapes);
    saveToLocalStorage("shapes", updatedShapes);
  };

  const renderShapes = (): JSX.Element[] => {
    return shapes.map((shape) => (
      <div
        key={shape.name}
        style={{
          position: "absolute",
          width: shape.size,
          height: shape.size,
          borderRadius: shape.isSquare ? "0%" : "50%",
          backgroundColor: shape.backgroundColor,
          top: shape.yPos,
          left: shape.xPos,
          margin: "0.5rem",
        }}
        onMouseDown={(e) => handleDragStart(e)}
      ></div>
    ));
  };

  const generateName = (): string => {
    const shapeCount = getFromLocalStorage("shapeCount");
    const newShapeCount = shapeCount ? parseInt(shapeCount) + 1 : 1;
    saveToLocalStorage("shapeCount", newShapeCount.toString());

    return `${shapeType}${newShapeCount}`;
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    document.addEventListener("mousemove", (event) => handleDrag(event));
    document.addEventListener("mouseup", handleDragEnd);
  };

  const handleDrag = (e: MouseEvent): void => {
    if (e.target instanceof HTMLElement) {
      const index = parseInt(e.target.dataset.index ?? "");
      if (!isNaN(index)) {
        const updatedShapes = [...shapes];
        updatedShapes[index].xPos = e.clientX;
        updatedShapes[index].yPos = e.clientY;

        setShapes(updatedShapes);
      }
    }
  };

  const handleDragEnd = (): void => {
    document.removeEventListener("mousemove", handleDrag);
    document.removeEventListener("mouseup", handleDragEnd);
  };

  return (
    <div className="app-container">
      <h2>Создай фигуру</h2>

      <div className="buttons-container">
        <button
          className="button shape"
          onClick={() => handleOpenModal("circle")}
        >
          Создать круг
        </button>
        <button
          className="button shape"
          onClick={() => handleOpenModal("square")}
        >
          Создать квадрат
        </button>
        <button
          className="button button-list"
          onClick={() => setModalOpen(true)}
        >
          Показать список фигур
        </button>
        <button className="button button-clear" onClick={clearShapes}>
          Очистить фигуры
        </button>
      </div>
      <div className="shape-box" style={{ position: "relative" }}>
        {renderShapes()}
      </div>
      {modalOpen && (
        <Modal
          shapeType={shapeType}
          onAddShape={handleAddShape}
          onClose={handleCloseModal}
          setSize={setShapeSize}
          setColor={setShapeColor}
          setPosition={handleSetShapePosition}
        />
      )}
      {modalOpen && (
        <ShapeList shapes={shapes} setShapePosition={handleSetShapePosition} />
      )}
    </div>
  );
};

export default App;
