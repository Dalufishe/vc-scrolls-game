
import React, { useState, useEffect } from 'react'
import ViewerCore from "../../../../core/ViewerCore"

export default function Viewer() {

  const [id, setId] = useState(0);
  const [viewer, setViewer] = useState(null)

  useEffect(() => {
    setViewer(new ViewerCore())
  }, [])

  useEffect(() => {
    if (viewer) { viewer.updateID(id) }
  }, [id, viewer])

  return (
    <div>
      <canvas id={"test"}></canvas>
    </div>
  )
}

