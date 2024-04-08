import React from 'react'

export default function TwoColumns({heading, text, image, direction}) {
  return (
    <div>
        <h2>{heading}</h2>
        <p>{text}</p>
    </div>
  )
}
