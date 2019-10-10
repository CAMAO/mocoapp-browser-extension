import React from "react"
import stopWatch from "images/icons/stopwatch-light.svg"

export default function StopWatch() {
  return (
    <i
      dangerouslySetInnerHTML={{ __html: stopWatch }}
      style={{ width: "22px", color: "white", display: "inline-block" }}
    />
  )
}
