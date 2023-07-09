
import React, { useState, useEffect, useRef } from 'react'
import ViewerCore from "../../../../core/ViewerCore"
import { cx } from '@emotion/css';


export default function Viewer({ id, className }) {

  const viewer = useRef(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // viewer component mounted
    if (!viewer.current) {
      viewer.current = new ViewerCore();
      viewer.current.init()
        .then(() => viewer.current.updateID(id))
        .then(() => {
          setLoaded(true);
          console.log(`id ${id} is loaded (first load)`)
        })

    }
    // change id
    else {
      setLoaded(false)
      viewer.current.updateID(id)
        .then(() => {
          setLoaded(true)
          console.log(`id ${id} is loaded`)
        })
    }
  }, [id])

  return (
    <div className={className}>
      <canvas id={"test"} className={loaded ? "" : 'hidden'}>
      </canvas>
      <div className={cx(loaded ? "hidden" : "", "fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]")}>loading... (nrrd file takes some time...)</div>
    </div >
  )
}

