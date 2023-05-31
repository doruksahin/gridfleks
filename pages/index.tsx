import React, {useEffect, useState} from 'react';
import usePrevious from '@/hooks/usePrevious';

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
  const LENGTH = 10;

  const [isDragging, setIsDragging] = useState<boolean | null>(null);
  const previousIsDragging = usePrevious(isDragging);
  const [candidateIndexes, setCandidateSquares] = useState<number[]>([]);
  const [squareIndexesList, setSquareIndexesList] = useState([]);
  const isDraggingStopped = previousIsDragging == true && isDragging == false;
  const squareProperties = processSquareIndexes(squareIndexesList);
  const squareIndexesToBeSkipped = squareIndexesList
    .map(squareIndexes => squareIndexes.slice(0))
    .flat()
    .sort((a, b) => a - b);
  const mergedSquareIndexes = squareIndexesList.flat();
  const completedSquarePreview = completeSquareShape(candidateIndexes);

  const handleMouseDown = (index: number) => {
    setIsDragging(true);
    setCandidateSquares([index]);
  };

  const handleMouseEnter = (index: number) => {
    if (!isDragging) return;
    setCandidateSquares([...candidateIndexes, index]);
  };

  useEffect(() => {
    if (!isDraggingStopped) return;
    const completedSquareShape = completeSquareShape(candidateIndexes);
    setCandidateSquares([]);
    if (
      completedSquareShape.some(candidateSquare =>
        mergedSquareIndexes.includes(candidateSquare),
      )
    )
      return;
    setSquareIndexesList(prev => [...prev, completedSquareShape]);
  }, [isDraggingStopped, candidateIndexes, mergedSquareIndexes]);

  function completeSquareShape(candidateSquareIndexes: number[]) {
    const copyCandidateSquareIndexes = [...candidateSquareIndexes];
    if (copyCandidateSquareIndexes.length < 2) {
      return copyCandidateSquareIndexes;
    }
    const floorNumbers = copyCandidateSquareIndexes
      .map(copyCandidateSquareItem =>
        Math.floor(copyCandidateSquareItem / LENGTH),
      )
      .sort((a, b) => a - b);
    const firstFloor = floorNumbers[0]!;
    const lastFloor = floorNumbers[floorNumbers.length - 1]!;
    for (const candidateSquareItem of copyCandidateSquareIndexes) {
      const candidateSquareItemFloor = Math.floor(candidateSquareItem / LENGTH);
      for (let i = candidateSquareItemFloor; i < lastFloor; i++) {
        const newNumber = candidateSquareItem + LENGTH;
        if (!copyCandidateSquareIndexes.includes(newNumber)) {
          copyCandidateSquareIndexes.push(newNumber);
        }
      }
      for (let i = candidateSquareItemFloor; i > firstFloor; i--) {
        const newNumber = candidateSquareItem - LENGTH;
        if (!copyCandidateSquareIndexes.includes(newNumber)) {
          copyCandidateSquareIndexes.push(newNumber);
        }
      }
    }
    if (
      copyCandidateSquareIndexes.some(candidateSquare =>
        mergedSquareIndexes.includes(candidateSquare),
      )
    ) {
      return [];
    }
    const sorted = copyCandidateSquareIndexes.sort((a, b) => a - b);
    return sorted;
  }

  function processSquareIndexes(squareIndexesList: number[][]) {
    const processedSquares = [];
    for (const squareIndexes of squareIndexesList) {
      let consecutiveNumberCount = 1;
      for (let i = 0; i < squareIndexes.length - 1; i++) {
        if (squareIndexes[i + 1] - squareIndexes[i] == 1) {
          consecutiveNumberCount += 1;
        } else {
          break;
        }
      }

      const yLength = squareIndexes.length / consecutiveNumberCount;
      processedSquares.push({
        xLength: consecutiveNumberCount,
        yLength: yLength,
        index: squareIndexes[0],
      });
    }
    return processedSquares;
  }
  return (
    <div
      className="grid h-screen"
      onMouseLeave={() => setIsDragging(false)}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => {
        setIsDragging(false);
      }}
      style={{
        gridTemplateColumns: `repeat(${LENGTH}, minmax(0, 1fr))`,
        gridAutoRows: 'minmax(0, 1fr)',
      }}>
      {new Array(LENGTH * LENGTH).fill(null).map((square, index) => {
        const filteredSquareProperties = squareProperties.filter(
          squareProperty => squareProperty.index == index,
        );
        const squareProperty =
          filteredSquareProperties.length > 0
            ? filteredSquareProperties[0]
            : null;
        const shouldSkip = squareIndexesToBeSkipped.includes(index);
        if (squareProperty) {
          return (
            <div
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              key={index}
              className=" flex items-center justify-center border border-black bg-gray-200"
              style={{
                gridRow: `span ${squareProperty.yLength}`,
                gridColumn: `span ${squareProperty.xLength}`,
              }}>
              {index}
            </div>
          );
        } else if (shouldSkip) {
          return <></>;
        } else {
          return (
            <div
              onMouseDown={() => handleMouseDown(index)}
              onMouseEnter={() => handleMouseEnter(index)}
              key={index}
              className={`flex select-none items-center justify-center border  ${
                completedSquarePreview.includes(index)
                  ? 'bg-red-200'
                  : 'bg-gray-100'
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
