
import React, { useState, useEffect, useRef } from 'react'
import ViewerCore from "../../../../core/ViewerCore"


export default function Viewer({ id, className }) {

  const viewer = useRef(null);

  useEffect(() => {
    viewer.current = new ViewerCore();
  }, [])

  useEffect(() => {
    if (viewer.current) {
      viewer.current.updateID(id)
    }
  }, [id])

  return (
    <div className={className}>
      <canvas id={"test"}></canvas>
    </div>
  )
}

