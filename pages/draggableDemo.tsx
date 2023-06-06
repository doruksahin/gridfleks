import React, {useEffect, useState} from 'react';
import Draggable from '@/components/Draggable';
import useMousePosition from '@/hooks/useMousePosition';

export default function App() {
  return <Grid />;
}

function Grid() {
  const mousePosition = useMousePosition();
  const [draggingRect, setDraggingRect] = useState({});

  function onDraggingStart(event) {
    console.log('started');
    const rect = event.target.getBoundingClientRect();
    const {x, y, width, height, top, right, bottom, left} = rect;
    setDraggingRect({
      x,
      y,
      width,
      height,
      lastMouseX: event.clientX,
      lastMouseY: event.clientY,
    });
    console.log(`Clicked coordinates: (${event.clientX}, ${event.clientY})`);
  }

  useEffect(() => {
    if (draggingRect.x == null) return;
    const {x: mouseX, y: mouseY} = mousePosition;
    setDraggingRect(prev => ({
      ...prev,
      x: prev.x - (prev.lastMouseX - mouseX),
      y: prev.y - (prev.lastMouseY - mouseY),
      lastMouseX: mouseX,
      lastMouseY: mouseY,
    }));
  }, [mousePosition]);

  function onDraggingStop(event) {
    console.log('stopped');
    setDraggingRect({});
    console.log(event.target.getBoundingClientRect());
    console.log(`Clicked coordinates: (${event.clientX}, ${event.clientY})`);
  }

  console.log('draggingRect', draggingRect);

  return (
    <div className="relative">
      {draggingRect.x != null ? (
        <div
          className="absolute bg-red-300 pointer-events-none"
          style={{
            top: draggingRect.y,
            left: draggingRect.x,
            width: draggingRect.width,
            height: draggingRect.height,
          }}></div>
      ) : (
        <></>
      )}
      <div
        onMouseDown={event => onDraggingStart(event)}
        onMouseUp={event => onDraggingStop(event)}
        className="grid grid-cols-5 gap-4">
        {/* Generate grid items */}
        {Array.from({length: 25}).map((_, index) => (
          <div
            key={index}
            className="bg-gray-200 p-4 flex items-center justify-center">
            {index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
