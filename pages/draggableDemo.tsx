import React, {useEffect, useState} from 'react';
import Draggable from '@/components/Draggable';
import useMousePosition from '@/hooks/useMousePosition';
import useDraggingPosition from '@/hooks/useDraggingPosition';

export default function App() {
  return <Grid />;
}

function Grid() {
  const mousePosition = useMousePosition();
  const {draggingRect, onDraggingStart, onDraggingStop} = useDraggingPosition();

  console.log('draggingRect', draggingRect);

  return (
    <div className="relative">
      <Dragged draggingRect={draggingRect} />
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

function Dragged({draggingRect}) {
  if (draggingRect.x == null) return;
  return (
    <div
      className="absolute bg-red-300 pointer-events-none"
      style={{
        top: draggingRect.y,
        left: draggingRect.x,
        width: draggingRect.width,
        height: draggingRect.height,
      }}
    />
  );
}
