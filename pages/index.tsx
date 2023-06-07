import React, {useEffect, useState} from 'react';
import usePrevious from '@/hooks/usePrevious';
import Grid from '@/components/Grid';
import GridCell from '@/components/GridCell';

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

export default function Index() {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(true);
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="border-4 border-black  bg-opacity-50 w-[90%] h-[90%]">
        <Grid isEditing={isEditing} setData={setData} initialData={data}></Grid>
      </div>
    </div>
  );
}
