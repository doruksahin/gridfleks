import React, {useEffect, useState} from 'react';
import usePrevious from 'hooks/usePrevious';

type Square = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  index: number;
};

type Point = {
  x: number;
  y: number;
};

export default function Grid() {
  const LENGTH = 5;
  const [isDragging, setIsDragging] = useState<boolean | null>(null);
  const previousIsDragging = usePrevious(isDragging);
  const isDraggingStopped = previousIsDragging == true && isDragging == false;

  const [squareIndexesList, setSquareIndexesList] = useState([]);
  const squareIndexesToBeSkipped = squareIndexesList
    .map(squareIndexes => squareIndexes.indices.slice(0))
    .flat()
    .sort((a, b) => a - b);

  const [completedSquarePreview, setCompletedSquarePreview] = useState<any>({
    xLength: 0,
    yLength: 0,
    indices: [],
  });
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  const draggingStarted = (index: number) => {
    setIsDragging(true);
    setDragStartIndex(index);
    setCurrentIndex(index);
  };

  const handleMouseEnter = (index: number) => {
    if (!isDragging) return;
    setCurrentIndex(index);
  };

  useEffect(() => {});

  useEffect(() => {
    if (dragStartIndex == null || currentIndex == null) return;
    setCompletedSquarePreview(completeSquare(currentIndex));
  }, [dragStartIndex, currentIndex]);

  useEffect(() => {
    if (!isDraggingStopped) return;
    setDragStartIndex(null);
    setCurrentIndex(null);
    if (completedSquarePreview.indices.length != 0) {
      setSquareIndexesList(prev => [...prev, completedSquarePreview]);
    }
  }, [isDraggingStopped, completedSquarePreview]);

  function completeSquare(lastIndex: number) {
    const startX = Math.floor(dragStartIndex / LENGTH);
    const endX = Math.floor(lastIndex / LENGTH);
    const [lowX, highX] = startX > endX ? [endX, startX] : [startX, endX];
    const xs = [];
    for (let i = lowX; i <= highX; i++) {
      xs.push(i);
    }

    const startY = dragStartIndex % LENGTH;
    const endY = lastIndex % LENGTH;
    const [lowY, highY] = startY > endY ? [endY, startY] : [startY, endY];
    const ys = [];
    for (let i = lowY; i <= highY; i++) {
      ys.push(i);
    }
    console.log('x', startX, endX);
    console.log('y', startY, endY);
    console.log('xs', xs);
    console.log('ys', ys);
    const candidateSquareIndices = [];
    for (const x of xs) {
      for (const y of ys) {
        candidateSquareIndices.push(x * LENGTH + y);
      }
    }
    console.log('candidates', candidateSquareIndices);
    if (
      candidateSquareIndices.some(gridIndex =>
        squareIndexesList.flat().includes(gridIndex),
      )
    )
      candidateSquareIndices.length = 0;
    return {
      xLength: xs.length,
      yLength: ys.length,
      indices: candidateSquareIndices,
    };
  }

  console.log(squareIndexesList);

  function mobileHandleTouchEnter(event) {
    const touch = event.touches[0];
    const gridItem = document.elementFromPoint(touch.clientX, touch.clientY);
    if (gridItem?.dataset?.index) {
      handleMouseEnter(gridItem.dataset.index);
    } else {
      setIsDragging(false);
    }
  }

  return (
    <div
      className="grid h-screen"
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchEnd={() => setIsDragging(false)}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
      style={{
        gridTemplateColumns: `repeat(${LENGTH}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${LENGTH}, minmax(0, 1fr))`,
        gridAutoRows: 'minmax(0, 1fr)',
        gridAutoColumns: 'minmax(0, 1fr)',
      }}>
      {new Array(LENGTH * LENGTH).fill(null).map((square, index) => {
        const filteredSquareProperties = squareIndexesList.filter(
          squareProperty => squareProperty.indices[0] == index,
        );
        const squareProperty =
          filteredSquareProperties.length > 0
            ? filteredSquareProperties[0]
            : null;
        const shouldSkip = squareIndexesToBeSkipped.includes(index);
        if (squareProperty) {
          return (
            <div
              data-index={index}
              onMouseDown={() => draggingStarted(index)}
              onTouchStart={() => draggingStarted(index)}
              onTouchMove={event => {
                mobileHandleTouchEnter(event);
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              key={index}
              className=" flex items-center justify-center border border-black "
              style={{
                gridRow: `span ${squareProperty.xLength}`,
                gridColumn: `span ${squareProperty.yLength}`,
              }}>
              {index}
            </div>
          );
        } else if (shouldSkip) {
          return <></>;
        } else {
          return (
            <div
              data-index={index}
              onMouseDown={() => draggingStarted(index)}
              onTouchStart={() => draggingStarted(index)}
              onTouchMove={event => {
                mobileHandleTouchEnter(event);
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              key={index}
              className={`flex select-none items-center justify-center border border-black ${
                completedSquarePreview.indices.includes(index)
                  ? 'bg-red-200'
                  : ''
              }`}>
              {index}
            </div>
          );
        }
      })}

      {/* Add more grid cells as needed */}
    </div>
  );
}
