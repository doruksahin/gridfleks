import useMousePosition from '@/hooks/useMousePosition';
import {useEffect, useState} from 'react';

export default function useDraggingPosition() {
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

  return {draggingRect, onDraggingStart, onDraggingStop};
}
