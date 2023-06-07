import {useEffect, useState} from 'react';

export default function GridCell({
  isEditing,
  data = [],
  setData,
  index,
  onUndoMerge,
}: {
  isEditing: boolean;
  data: any;
  setData: any;
  index: number;
  onUndoMerge: any;
}) {
  const [text, setText] = useState(null);

  useEffect(() => {
    const datum = data.find(datum => datum.indices[0] == index);
    if (datum) {
      setText(datum.yourCustomComponentText);
    }
  }, []);

  useEffect(() => {
    if (!text) return;
    setData(prevData =>
      prevData.map(square => {
        if (square.indices.includes(index)) {
          return {...square, yourCustomComponentText: text};
        }
        return square;
      }),
    );
  }, [text]);

  function textChanged(event) {
    setText(event.target.value);
  }

  function removeNote() {
    onUndoMerge();
    const {[index]: removedObj, ...newData} = data;
    setData(data.filter(datum => datum.indices[0] !== index));
  }

  return (
    <div className="flex grow">
      {isEditing ? (
        <>
        <div
          onClick={() => {
            removeNote();
            onUndoMerge();
          }}
          className="bg-red-500 cursor-pointer">
          X
        </div>
          <MyText text={text}/>
        </>
      ) : (
        <MyText text={text}/>
        )}
    </div>
  );
}

function MyText({text}){
  return (
    <div>
    {text ? text : "This is a custom grid cell"}
    </div>
  )
}