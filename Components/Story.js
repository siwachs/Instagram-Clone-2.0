import React from 'react'

//Lazy load Image
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

function Story({ username, avatar }) {
  return (
    <div>
      <LazyLoadImage
        className="p[1.5px] h-12 w-12 transform cursor-pointer rounded-full border-2 object-contain transition duration-200 ease-out hover:scale-110"
        src={avatar}
        effect="blur"
      ></LazyLoadImage>
      <p className="w-16 cursor-pointer truncate text-center text-xs">
        {username}
      </p>
    </div>
  )
}

export default Story
