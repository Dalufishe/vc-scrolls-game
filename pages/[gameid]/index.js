/**
 * * Components:
 * * "../../components/pages/GamePage"
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Viewer from "../../components/pages/GamePage/Viewer/Viewer";
import nrrd from "../../constant/nrrd";
import { cx } from "@emotion/css";
import ConfirmBtn from "../../components/pages/GamePage/ConfirmBtn/ConfirmBtn";

export default function Index() {
  // states
  const [idArray, setIdArray] = useState([]);
  const [currentIdIndex, setCurrentIdIndex] = useState(0);
  const [labels, setLabels] = useState([]);
  const [select, setSelect] = useState([]);
  const [isEndGame, setIsEndGame] = useState(false);

  // get random nrrd ids
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 10; i++) {
      arr.push(Math.floor(Math.random() * nrrd.count));
    }
    setIdArray(arr);
  }, []);

  // get labels data
  useEffect(() => {
    fetch("./volume/meta.json")
      .then((res) => res.json())
      .then((json) => {
        const { nrrd } = json;
        const arr = [];
        nrrd.map((n) => {
          for (let id of idArray) {
            if (id === Number(n.id)) {
              arr.push(n.label);
            }
          }
        });
        setLabels(arr);
        console.log(arr);
      });
  }, [idArray]);

  // logics
  const handleNext = useCallback(
    (s) => {
      setSelect([...select, s]);

      if (currentIdIndex >= idArray.length - 1) {
        if (currentIdIndex === idArray.length - 1) {
          setIsEndGame(true);
        }
        setCurrentIdIndex(idArray.length - 1);
      } else {
        setCurrentIdIndex(currentIdIndex + 1);
      }
    },
    [currentIdIndex, idArray]
  );

  const handleScore = useCallback(() => {
    let score = 0;

    for (let i = 0; i < labels.length; i++) {
      // hand-write
      if (labels[i] > 0.1) {
        if (select[i]) score++;
      }
      // no hand-write
      else {
        if (!select[i]) score++;
      }
    }

    return score;
  }, [labels, select]);

  return (
    <div>
      {idArray.length ? <Viewer id={idArray[currentIdIndex]} /> : ""}
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
        {isEndGame ? (
          <>
            <ConfirmBtn>Score - {handleScore()}</ConfirmBtn>
          </>
        ) : (
          <>
            <ConfirmBtn
              onClick={() => {
                handleNext(0);
              }}
            >
              No
            </ConfirmBtn>
            <ConfirmBtn
              onClick={() => {
                handleNext(1);
              }}
            >
              Yes
            </ConfirmBtn>
          </>
        )}
      </div>
    </div>
  );
}
