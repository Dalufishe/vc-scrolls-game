/**
 * * Components:
 * * "../../components/pages/GamePage"
 */

import { useEffect, useRef, useState } from "react";
import Viewer from "../../components/pages/GamePage/Viewer/Viewer";
import nrrd from "../../constant/nrrd";
import { cx } from "@emotion/css";
import ConfirmBtn from "../../components/pages/GamePage/ConfirmBtn/ConfirmBtn";

export default function Index() {
  const idArray = useRef([0]);
  const [currentIdIndex, setCurrentIdIndex] = useState(0);

  useEffect(() => {
    for (let i = 1; i < 10; i++) {
      idArray.current[i] = Math.floor(Math.random() * nrrd.count);
    }
  }, []);

  const handleNext = () => {
    if (currentIdIndex >= idArray.current.length - 1)
      setCurrentIdIndex(idArray.current.length - 1);
    else {
      setCurrentIdIndex(currentIdIndex + 1);
    }
  };

  return (
    <div>
      <Viewer id={idArray.current[currentIdIndex]} />
      {/* floating dom elements */}
      <div
        className={cx(
          "fixed top-16 left-[50%] translate-x-[-50%]",
          "w-[90%]",
          "text-3xl",
          "flex flex-col items-center justify-center gap-1",
          "bg-m1.5",
          "p-3",
          "rounded-lg",
          "font-bold"
        )}
      >
        <h5 className={cx("text-xl text-c1 font-normal")}>
          - round {currentIdIndex + 1} -
        </h5>
        <h3>- Guess if the following scroll has any inscriptions -</h3>
      </div>
      <div
        className={cx(
          "fixed bottom-16 left-[50%] translate-x-[-50%]",
          "flex gap-20",
          "text-3xl"
        )}
      >
        <ConfirmBtn onClick={handleNext}>No</ConfirmBtn>
        <ConfirmBtn onClick={handleNext}>Yes</ConfirmBtn>
      </div>
    </div>
  );
}
