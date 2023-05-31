import {useState, createRef, useEffect} from 'react';
import {Canvas} from '@react-three/fiber';
import {Nodes, Node} from './Nodes';
import uuid from 'react-uuid';

function NodeContainer() {
  const [[a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, r, s, x, y, z, t]] =
    useState(() => [...Array(22)].map(createRef));
  return (
    <Canvas orthographic camera={{zoom: 50}}>
      <Nodes>
        <Node
          ref={g}
          name="g"
          color="#904020"
          position={[-0.5, -1, 0]}
          connectedTo={[j]}
        />
        <Node
          ref={h}
          name="h"
          color="#209040"
          position={[-1.5, -2.5, 0]}
          connectedTo={[i]}
        />
        <Node
          ref={i}
          name="i"
          color="#204090"
          position={[1.5, 2, 0]}
          connectedTo={[]}
        />
        <Node
          ref={j}
          name="j"
          color="#204090"
          position={[3, -3, 0]}
          connectedTo={[i]}
        />
      </Nodes>
    </Canvas>
  );
}

export default function NodeScreen() {
  const [opacity, setOpacity] = useState<0 | 1>(0);
  useEffect(() => {
    setOpacity(1);
  }, []);
  return (
    <div
      className="absolute -top-10 -left-10 mt-10 h-[80vh] w-screen md:left-10 md:w-[80vw] lg:left-16"
      style={{
        opacity,
        transition: 'opacity 2s ease-in-out',
      }}>
      <NodeContainer />
    </div>
  );
}
