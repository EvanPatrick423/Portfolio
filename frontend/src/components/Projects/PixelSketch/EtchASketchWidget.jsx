import React, { useState, useEffect, useRef } from 'react';
import './EtchASketchWidget.css';

const EtchASketchWidget = () => {
  const [eraser, setEraser] = useState(false);
  const [ink, setInk] = useState('#000000');
  const [gridSize, setGridSize] = useState(48);
  const [mouseDown, setMouseDown] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [pixelsDrawn, setPixelsDrawn] = useState(0);
  const boardRef = useRef(null);

  useEffect(() => {
    createGrid(gridSize);
    return () => {
      
    };
  }, [gridSize, ink, mouseDown]);

  const createGrid = (size) => {
    if (!boardRef.current) return;
    
    // Store existing grid colors before clearing
    const existingColors = [];
    const existingGridItems = boardRef.current.querySelectorAll('.grid-item');
    existingGridItems.forEach((item, index) => {
      existingColors[index] = item.style.backgroundColor;
    });
    
    // Clear existing grid
    boardRef.current.innerHTML = '';
    
    for (let i = 0; i < size; i++) {
      console.log('Creating grid item:', i);
      const row = document.createElement('div');
      row.style.cssText = 'flex:1 1 0; display:flex;';
      boardRef.current.appendChild(row);

      for (let x = 0; x < size; x++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add("grid-item");
        gridItem.classList.add("unselectable");
        
        // Restore background color if it exists
        const colorIndex = i * size + x;
        if (existingColors[colorIndex] && existingColors[colorIndex] !== 'rgba(0, 0, 0, 0)' && existingColors[colorIndex] !== '') {
          gridItem.style.backgroundColor = existingColors[colorIndex];
        }
        
        gridItem.addEventListener('mousedown', drawOnClick);
        gridItem.addEventListener('mouseenter', drawWhileClicked);
        // Remove the individual mouseup listener - we'll handle it at board level
        row.appendChild(gridItem);
      }
    }
  };

  const drawOnClick = (e) => {
    setMouseDown(true);
    setIsDrawing(true);
    console.log('Mouse down set to true', mouseDown);
    // Use current state values instead of closure values
    const currentEraser = eraser;
    const currentInk = ink;
    if (currentEraser) {
      {/*if (e.target.style.backgroundColor !== 'rgb(255, 255, 255)') {
        setPixelsDrawn(prev => prev - 1);
      }*/}
    } else {
      if (e.target.style.backgroundColor === 'rgb(255, 255, 255)') {
        setPixelsDrawn(prev => prev + 1);
      }
      e.target.style.backgroundColor = currentInk;
      e.target.classList.add('colored-pixel');
    }
  };

  const drawWhileClicked = (e) => {
    if (mouseDown) {
      // Use current state values instead of closure values
      const currentEraser = eraser;
      const currentInk = ink;
      if (currentEraser) {
        if (e.target.style.backgroundColor !== 'rgb(255, 255, 255)') {
          e.target.style.backgroundColor = '#ffffff';
          e.target.classList.remove('colored-pixel');
          setPixelsDrawn(prev => prev - 1);
        }
        
      } else {
        if (e.target.style.backgroundColor === 'rgb(255, 255, 255)') {
          setPixelsDrawn(prev => prev + 1);
        }
        e.target.style.backgroundColor = currentInk;
        e.target.classList.add('colored-pixel');
        
      }
    }
  };

  const handleMouseDown = () => {
    setMouseDown(true);
    console.log('Board mouse leave - set to true', mouseDown);
  };

  const handleMouseUp = () => {
    setMouseDown(false);
    setIsDrawing(false);
    console.log('Board mouse leave - set to false', mouseDown);
  };

  const handleMouseLeave = () => {
    setMouseDown(false);
    setIsDrawing(false);
    console.log('Board mouse leave - set to false', mouseDown);
  };

  const toggleEraser = () => {
    setEraser(!eraser);
  };

  const eraseAll = () => {
    const items = document.querySelectorAll(".grid-item");
    items.forEach(item => {
      item.style.backgroundColor = '#ffffff';
      item.classList.remove('colored-pixel');
    });
    setPixelsDrawn(0);
  };

  const handleGridSizeChange = (value) => {
    eraseAll();
    setGridSize(parseInt(value));
  };

  const handleColorChange = (e) => {
    setInk(e.target.value);
  };

  return (
    <div className="etch-a-sketch-widget">
      <div className="widget-header">
        <div className="title-section">
          <h2 className="widget-title">🎨 Pixel Pad</h2>
          <p className="widget-subtitle">Create pixel art with your mouse or touch</p>
        </div>
        
        <div className="stats-section">
          <div className="stat-item">
            <span className="stat-icon">🎯</span>
            <span className="stat-label">Grid</span>
            <span className="stat-value">{gridSize}×{gridSize}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🖌️</span>
            <span className="stat-label">Pixels</span>
            <span className="stat-value">{pixelsDrawn}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">✏️</span>
            <span className="stat-label">Mode</span>
            <span className="stat-value">{eraser ? 'Eraser' : 'Draw'}</span>
          </div>
        </div>
      </div>

      <div className="widget-content">
        <div className="controls-panel">
          <div className="tool-section">
            <h4 className="section-title">🛠️ Tools</h4>
            <div className="tool-buttons">
              <button 
                className={`tool-btn ${eraser ? '' : 'active'}`}
                onClick={() => setEraser(false)}
                title="Draw Mode"
              >
                <span className="btn-icon">🖌️</span>
                <span className="btn-text">Draw</span>
              </button>
              <button 
                className={`tool-btn ${eraser ? 'active' : ''}`}
                onClick={() => setEraser(true)}
                title="Eraser Mode"
              >
                <span className="btn-icon">🧽</span>
                <span className="btn-text">Eraser</span>
              </button>
            </div>
          </div>

          <div className="color-section">
            <h4 className="section-title">🎨 Color</h4>
            <div className="color-picker-container">
              <div className="color-preview" style={{backgroundColor: ink}}>
                <input 
                  type="color" 
                  value={ink}
                  onChange={handleColorChange}
                  className="color-input"
                  title="Choose color"
                />
              </div>
              <div className="color-info">
                <span className="color-label">Current Color</span>
                <span className="color-value">{ink.toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className="grid-section">
            <h4 className="section-title">📐 Grid Size</h4>
            <div className="slider-container">
              <input 
                type="range" 
                value={gridSize}
                min="16" 
                max="64" 
                onChange={(e) => handleGridSizeChange(e.target.value)}
                className="grid-slider"
                title="Adjust grid size"
              />
              <div className="slider-labels">
                <span>16×16</span>
                <span>64×64</span>
              </div>
            </div>
          </div>

          <div className="action-section">
            <h4 className="section-title">🔄 Actions</h4>
            <button className="action-btn clear-btn" onClick={eraseAll}>
              <span className="btn-icon">🗑️</span>
              <span className="btn-text">Clear Canvas</span>
            </button>
          </div>

          <div className="drawing-indicator">
            <div className={`status-light ${isDrawing ? 'active' : ''}`}></div>
            <span className="status-text">
              {isDrawing ? '🖌️ Drawing...' : '✋ Ready to draw'}
            </span>
          </div>
        </div>
        
        <div className="canvas-section">
          <div className="canvas-container">
            <div 
              draggable="false" 
              ref={boardRef} 
              className={`drawing-board ${eraser ? 'eraser-mode' : 'draw-mode'}`}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EtchASketchWidget; 