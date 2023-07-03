import React, { useRef, useState, useEffect } from "react";

// demo
// export default function App() {
//   const [hover, isHover] = useHover();

//   return <div ref={hover}>{isHover ? "yes" : "NO"}</div>;
// }

// Hook
const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
    }
  });

  return [ref, value];
};

export default useHover