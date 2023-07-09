
import React, { useState, useEffect, useRef } from 'react'
import ViewerCore from "../../../../core/ViewerCore"


export default function Viewer({ id, className }) {

  const viewer = useRef(null);

  useEffect(() => {
    if (!viewer.current) {
      viewer.current = new ViewerCore();
      viewer.current.init()
        .then(() => viewer.current.updateID(id))
        .then(() => console.log(`id ${id} is loaded`))
    } else {
      viewer.current.updateID(id)
        .then(() => console.log(`id ${id} is loaded`))
    }
  }, [id])

  return (
    <div className={className}>
      <canvas id={"test"}></canvas>
    </div>
  )
}

