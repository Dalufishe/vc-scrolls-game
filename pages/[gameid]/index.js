/**
 * * Components:
 * * "../../components/pages/GamePage"
 */

import { useEffect, useRef, useState } from "react";
import Viewer from "../../components/pages/GamePage/Viewer/Viewer";
import nrrd from "../../constant/nrrd";
import { cx } from "@emotion/css";

export default function Index() {

  const idArray = useRef([0]);
  const [currentIdIndex, setCurrentIdIndex] = useState(0);

  useEffect(() => {
    for (let i = 1; i < 10; i++) {
      idArray.current[i] = Math.floor(Math.random() * nrrd.count);
    }
    console.log(idArray.current);
  }, []);

  const handleNext = () => {
    if (currentIdIndex >= idArray.current.length - 1)
      setCurrentIdIndex(idArray.current.length - 1);
    else {
      setCurrentIdIndex(currentIdIndex + 1);
    }
  };
  const handlePrev = () => {
    if (currentIdIndex <= 0) setCurrentIdIndex(0);
    else {
      setCurrentIdIndex(currentIdIndex - 1);
    }
  };

  return (
    <div className="relative">
      <Viewer id={idArray.current[currentIdIndex]} className={"relative"} />
      <div
        className={cx(
          "absolute bottom-20 left-[50%] translate-x-[-50%]",
          "flex gap-20",
          "text-3xl"
        )}
      >
        <button onClick={handlePrev} className="border border-m2 p-3">
          Prev
        </button>
        <button onClick={handleNext} className="border border-m2 p-3">
          Next
        </button>
      </div>
    </div>
  );
}
