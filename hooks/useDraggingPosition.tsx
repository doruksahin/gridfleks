import useMousePosition from './useMousePosition';
import {useEffect, useState} from 'react';

export default function useDraggingPosition() {
  const mousePosition = useMousePosition();
  const [draggingRect, setDraggingRect] = useState({});

  function onDraggingStart(event) {
    const rect = event.target.getBoundingClientRect();
    const {x, y, width, height, top, right, bottom, left} = rect;

    setDraggingRect({
      x,
      y,
      width,
      height,
      lastMouseX: event.clientX,
      lastMouseY: event.clientY,
      mouseLeft: x - event.clientX,
      mouseTop: y - event.clientY,
    });
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
    setDraggingRect({});
  }

  return {draggingRect, onDraggingStart, onDraggingStop};
}
