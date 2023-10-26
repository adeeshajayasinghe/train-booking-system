import React from 'react'

export default function ColorList() {
  return (
    <div className="legend">
  <div className="legend-item">
    <div className="color-box" style={{ backgroundColor: 'rgb(0,255,0)' }}></div>
    <div className="label"> First Class</div>
  </div>
  <div className="legend-item">
    <div className="color-box" style={{ backgroundColor: 'rgb(255,0,0)' }}></div>
    <div className="label">Second Class</div>
  </div>
  <div className="legend-item">
    <div className="color-box" style={{ backgroundColor: 'rgb(0,0,255)' }}></div>
    <div className="label">Third Class</div>
  </div>
</div>
  )
}
