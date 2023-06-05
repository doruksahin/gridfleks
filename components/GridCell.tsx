import {useEffect, useState} from 'react';

export default function GridCell({
  isEditing,
  data,
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
      setText(datum.text);
    }
  }, []);

  useEffect(() => {
    if (!text) return;
    setData(prevData =>
      prevData.map(square => {
        if (square.indices.includes(index)) {
          return {...square, text: text};
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
        <div
          onClick={() => {
            removeNote();
            onUndoMerge();
          }}
          className="bg-red-500">
          X
        </div>
      ) : (
        <></>
      )}
      <textarea
        className="w-full cursor-auto resize-none overflow-y-auto border border-black bg-yellow-300 bg-opacity-80 outline-none"
        onChange={event => textChanged(event)}
        disabled={!isEditing}
        readOnly={!isEditing}
        value={text}
      />
    </div>
  );
}
