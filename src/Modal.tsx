import React, { useState } from 'react';

interface ModalProps {
  shapeType: string;
  onAddShape: () => void;
  onClose: () => void;
  setSize: (size: number) => void;
  setColor: (color: string) => void;
  setPosition: (name: string, xPos: number, yPos: number) => void;
}

const Modal: React.FC<ModalProps> = ({
  shapeType,
  onAddShape,
  onClose,
  setSize,
  setColor,
  setPosition,
}) => {
  const [shapeSize, setShapeSize] = useState<number>(0);
  const [shapeColor, setShapeColor] = useState<string>('');
  const [shapeXPos, setShapeXPos] = useState<number>(0);
  const [shapeYPos, setShapeYPos] = useState<number>(0);

  const handleAddShape = (): void => {
    setSize(shapeSize);
    setColor(shapeColor);
    setPosition(shapeType, shapeXPos, shapeYPos);
    onAddShape();
    resetForm();
  };

  const resetForm = (): void => {
    setShapeSize(0);
    setShapeColor('');
    setShapeXPos(0);
    setShapeYPos(0);
  };

  return (
    <div className="modal-container">
      <div className="modal-content">
        <h3>Create Your Shape</h3>
        {shapeType === 'circle' && (
          <div className="modal-input-container">
            <label htmlFor="sizeInput">Diameter:</label>
            <input
              type="number"
              id="sizeInput"
              value={shapeSize}
              onChange={(e) => setShapeSize(Number(e.target.value))}
            />
          </div>
        )}
        {shapeType === 'square' && (
          <div className="modal-input-container">
            <label htmlFor="sizeInput">Length:</label>
            <input
              type="number"
              id="sizeInput"
              value={shapeSize}
              onChange={(e) => setShapeSize(Number(e.target.value))}
            />
          </div>
        )}
        <div className="modal-input-container">
          <label htmlFor="colorInput">Background Color:</label>
          <input
            type="color"
            id="colorInput"
            value={shapeColor}
            onChange={(e) => setShapeColor(e.target.value)}
          />
        </div>
        <div className="modal-input-container">
          <label htmlFor="xPosInput">X Position:</label>
          <input
            type="number"
            id="xPosInput"
            value={shapeXPos}
            onChange={(e) => setShapeXPos(Number(e.target.value))}
          />
        </div>
        <div className="modal-input-container">
          <label htmlFor="yPosInput">Y Position:</label>
          <input
            type="number"
            id="yPosInput"
            value={shapeYPos}
            onChange={(e) => setShapeYPos(Number(e.target.value))}
          />
        </div>
        <div className="modal-button-container">
          <button className="modal-button" onClick={handleAddShape}>
            Add Shape
          </button>
          <button className="modal-button" onClick={onClose}>
            Close
          </button>

          </div>
      </div>
    </div>
  );
};

export default Modal;
